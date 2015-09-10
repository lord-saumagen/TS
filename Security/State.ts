module TS
{
  "use strict";

  export module Security
  {

    //
    // Reference check
    //
    (function ()
    {
      var _missingArray: Array<string>;
      _missingArray = new Array<string>();

      if (TS.Utils == undefined)
      {
        _missingArray.push("TS.Utils");
      }

      if (TS.Utils.Assert == undefined)
      {
        _missingArray.push("TS.Utils.Assert");
      }

      if ((TS.TypeCode == undefined) || (TS.TypeCode.UInt64 == undefined))
      {
        _missingArray.push("TS.TypeCode.UInt64");
      }

      if (TS.Exception == undefined)
      {
        _missingArray.push("TS.Exception");
      }

      if (TS.Security.Cryptography == undefined)
      {
        _missingArray.push("TS.Security.Cryptography");
      }

      if (_missingArray.length > 0)
      {
        throw new Error("TS.Security.State requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if

    })();


    function multiplyByTwo(x: number): number
    {
      return TS.Security.getAES_multByTwoArray()[x];
    }


    function multiplyByThree(x: number): number
    {
      return TS.Security.getAES_multByThreeArray()[x];
    }


    function multiplyByFourteen(x: number): number
    {
      return TS.Security.getAES_multByFourteenArray()[x];
    }


    function multiplyByThirteen(x: number): number
    {
      return TS.Security.getAES_multByThirteenArray()[x];
    }


    function multiplyByEleven(x: number): number
    {
      return TS.Security.getAES_multByElevenArray()[x];
    }


    function multiplyByNine(x: number): number
    {
      return TS.Security.getAES_multByNineArray()[x];
    }


    function getRoundConstant(index: number): number
    {
      return TS.Security.getAES_roundConstants()[index];
    }


    function getSubstitution(index: number): number
    {
      return TS.Security.getAES_substitutionTable()[index];
    }


    function getInversSubstitution(index: number): number
    {
      return TS.Security.getAES_inverseSubstitutionTable()[index];
    }


    //TODO: Add descripion
    /**
    * @class
    * @classdesc 
    */
    export class State extends TS.Security.Cryptography
    {
      private _state: Array<Array<number>>;

      public get Hex(): Array<Array<string>>
      {
        var _resultArray: Array<Array<string>>;
        var _index: number;

        _resultArray = new Array<Array<string>>();
        _resultArray[0] = new Array<string>();
        _resultArray[1] = new Array<string>();
        _resultArray[2] = new Array<string>();
        _resultArray[3] = new Array<string>();

        for (_index = 0; _index < 4; _index++)
        {
          _resultArray[0].push(TS.Utils.UnsignedByteToHexString(this._state[0][_index]));
          _resultArray[1].push(TS.Utils.UnsignedByteToHexString(this._state[1][_index]));
          _resultArray[2].push(TS.Utils.UnsignedByteToHexString(this._state[2][_index]));
          _resultArray[3].push(TS.Utils.UnsignedByteToHexString(this._state[3][_index]));
        }//END for

        return _resultArray;
      }

      /**
      * @constructs
      * @description Creates a new State instance from the byte array given in 
      *              argument 'byteArray16'.
      * 
      * @param {Array<number>} byteArray16, an array of 16 byte values.
      * 
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidOperationException}
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentOutOfRangeException}
      */
      constructor(byteArray16: Array<number>)
      {
        TS.Utils.checkConstructorCall(this, TS.Security.State);
        TS.Utils.checkNotEmptyParameter(byteArray16, "keyByteArray", "TS.Security.State.constructor");
        TS.Utils.checkUnsignedByteArrayParameter(byteArray16, "byteArray16", "TS.Security.State.constructor");

        
        if (byteArray16.length != 16)
        {
          throw new TS.ArgumentOutOfRangeException("byteArray16", byteArray16, "Argument 'byteArray16' is not a valid array of 16 unsigned bytes in function: 'Security.State.constructor'.")
        }//END if

        super();
        this.fromArray(byteArray16);
      }


      /**
      * @description Executes the forward cipher operation on 
      *              the current state.
      * 
      * @param {Array<number>} workingKeyByteArray
      * @param {number} rounds
      */
      public encrypt(workingKeyByteArray: Array<number>, rounds: number): void
      {
        var _round: number;

        this.addRoundKey(workingKeyByteArray, 0);

        for (_round = 1; _round < rounds; _round++)
        {
          this.substituteBytes();
          this.shiftRows();
          this.mixColumns();
          this.addRoundKey(workingKeyByteArray, _round * 16);
        }//END for

        this.substituteBytes();
        this.shiftRows();
        this.addRoundKey(workingKeyByteArray, rounds * 16);
      }


      /**
      * @description Executes the backward cipher operation on 
      *              the current state.
      * 
      * @param {Array<number>} workingKeyByteArray
      * @param {number} rounds
      */
      public decrypt(workingKeyByteArray: Array<number>, rounds: number): void
      {
        var _round: number;

        this.addRoundKey(workingKeyByteArray, rounds * 16);

        for (_round = rounds - 1; _round > 0; _round--)
        {
          this.inverseShiftRows();
          this.inverseSubstituteBytes();
          this.addRoundKey(workingKeyByteArray, _round * 16);
          this.inverseMixColumns();
        }//END for

        this.inverseShiftRows();
        this.inverseSubstituteBytes();
        this.addRoundKey(workingKeyByteArray, 0);
      }



      /**
      * @description Returns all bytes of the current state as 
      *              a byte array with 16 elements.
      * 
      * @returns {Array<number>} (Array of 16 byte)
      */
      public toArray(): Array<number>
      {
        var _resultArray: Array<number>
        var _column0: Array<number>;
        var _column1: Array<number>;
        var _column2: Array<number>;
        var _column3: Array<number>;

        _resultArray = new Array<number>();
        _column0 = this.getColumn(0);
        _column1 = this.getColumn(1);
        _column2 = this.getColumn(2);
        _column3 = this.getColumn(3);

        _resultArray.push(_column0[0], _column0[1], _column0[2], _column0[3]);
        _resultArray.push(_column1[0], _column1[1], _column1[2], _column1[3]);
        _resultArray.push(_column2[0], _column2[1], _column2[2], _column2[3]);
        _resultArray.push(_column3[0], _column3[1], _column3[2], _column3[3]);

        return _resultArray;
      }


      /**
      * @description Executes the XOR operation on all bytes of the 
      *              current state with the corresponding bytes of 
      *              the 'otherState'.
      * 
      * @params {TS.Security.State} otherState
      */
      public xor(otherState: State) : void
      {
        var _firstStateArray: Array<number>;
        var _secondStateArray: Array<number>;
        var _resultArray: Array<number>;

        if (TS.Utils.Assert.isNullOrUndefined(otherState))
        {
          return;
        }//END if

        _firstStateArray = this.toArray();
        _secondStateArray = otherState.toArray();
        _resultArray = new Array<number>();
        _firstStateArray.forEach((value, index, arr) => _resultArray.push(value ^ _secondStateArray[index]));
        this.fromArray(_resultArray);
      }


      /**
      * @private
      * @description Overwrites the state array with the values 
      *              given in argument byteArray16.
      * 
      * @param {Array<number>} byteArray16 (Array of 16 byte)
      */
      private fromArray(byteArray16: Array<number>): void
      {
        var _index: number;

        this._state = new Array<Array<number>>();
        this._state[0] = [];
        this._state[1] = [];
        this._state[2] = [];
        this._state[3] = [];

        for (_index = 0; _index < 4; _index++)
        {
          this._state[0][_index] = byteArray16[_index * 4 + 0];
          this._state[1][_index] = byteArray16[_index * 4 + 1];
          this._state[2][_index] = byteArray16[_index * 4 + 2];
          this._state[3][_index] = byteArray16[_index * 4 + 3];
        }//END for
      }

      /**
      * @private
      * @description Returns the row with the specified index
      *              from the state array.
      * 
      * @param {number} rowIndex
      * 
      * @returns {Array<number>}, the requested row in an array of 4 byte values.
      * 
      * @throws {TS.ArgumentException}
      * @throws {TS.ArgumentOutOfRangeException}
      */
      private getRow(rowIndex: number): Array<number>
      {
        if ((rowIndex < 0) || (rowIndex > 3))
        {
          throw new TS.ArgumentOutOfRangeException("rowIndex", rowIndex, "Argument 'rowIndex' must be an integer value between 0 .. 3 in function 'TS.Security.State.getRow'.");
        }//END if

        return this._state[rowIndex].slice();
      }


      /**
      * @private
      * @description Sets the row with the specified index in the
      *              state array.
      * 
      * @param {number} rowIndex
      * @param {Array<number>} byteArray4 (Array of four byte)
      * 
      * @throws {TS.ArgumentOutOfRangeException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentException}
      */
      private setRow(rowIndex: number, byteArray4: Array<number>): void
      {
        if ((rowIndex < 0) || (rowIndex > 3))
        {
          throw new TS.ArgumentOutOfRangeException("rowIndex", rowIndex, "Argument 'rowIndex' must be an integer value between 0 .. 3 in function 'TS.Security.State.setRow'.");
        }//END if

        TS.Utils.checkUnsignedByteArrayParameter(byteArray4, "byteArray4", "TS.Security.State.setRow");
        if (byteArray4.length != 4)
        {
          throw new TS.ArgumentException("byteArray4", byteArray4, "Argument 'byteArray4' has not the required length of 4 elements in function 'TS.Security.State.setRow'.");
        }

        this._state[rowIndex] = byteArray4.slice();
      }


      /**
      * @private
      * @description Returns the column with the specified index
      *              from the state array.
      * 
      * @param {number} columnIndex
      * 
      * @returns {Array<number>}, the requested column in an array of 4 byte values.
      *
      * @throws {TS.ArgumentOutOfRangeException}
      */
      private getColumn(columnIndex: number): Array<number>
      {
        var _resultArray: Array<number>;

        if ((columnIndex < 0) || (columnIndex > 3))
        {
          throw new TS.ArgumentOutOfRangeException("columnIndex", columnIndex, "Argument rowIndex must be an integer value between 0 .. 3 in function 'TS.Security.State.getColumn'.");
        }//END if

        _resultArray = new Array<number>();

        _resultArray.push(this._state[0][columnIndex]);
        _resultArray.push(this._state[1][columnIndex]);
        _resultArray.push(this._state[2][columnIndex]);
        _resultArray.push(this._state[3][columnIndex]);

        return _resultArray;
      }


      /**
      * @private
      * @description Sets the column with the specified index
      *              in the state array.
      * 
      * @param {number} columnIndex
      * @param {Array<number>} byteArray4 (Array of four byte)
      * 
      * @throws {TS.ArgumentOutOfRangeException}
      * @throws {TS.InvalidTypeException}
      */
      private setColumn(columnIndex: number, byteArray4: Array<number>): void
      {
        if ((columnIndex < 0) || (columnIndex > 3))
        {
          throw new TS.ArgumentOutOfRangeException("columnIndex", columnIndex, "Argument rowIndex must be an integer value between 0 .. 3 in function 'TS.Security.State.setColumn'.");
        }//END if

        TS.Utils.checkUnsignedByteArrayParameter(byteArray4, "byteArray4", "TS.Security.State.setColumn");

        this._state[0][columnIndex] = byteArray4[0];
        this._state[1][columnIndex] = byteArray4[1];
        this._state[2][columnIndex] = byteArray4[2];
        this._state[3][columnIndex] = byteArray4[3];
      }


      //TODO: Add descripion
      /**
      * @private
      *
      * @param {Array<number>} workingKeyByteArray
      * @param {number} workingKeyByteArrayOffset
      */
      private addRoundKey(workingKeyByteArray: Array<number>, workingKeyByteArrayOffset: number): void
      {
        var _resultArray: Array<number>
        var _offset: number;
        var _index: number;
        var _tempWord: Array<number>
        var _tempColumn: Array<number>;
        var _tempKeyScheduleColumn: Array<number>;
        var _keyScheduleState: State;

        _resultArray = new Array<number>();
        _keyScheduleState = new State(workingKeyByteArray.slice(workingKeyByteArrayOffset, workingKeyByteArrayOffset + 16));

        for (_index = 0; _index < 4; _index++)
        {
          _tempColumn = this.getColumn(_index);
          _tempKeyScheduleColumn = _keyScheduleState.getColumn(_index);
          _tempWord = TS.Security.State.xorWord(_tempColumn, _tempKeyScheduleColumn);
          _resultArray.push(_tempWord[0], _tempWord[1], _tempWord[2], _tempWord[3]);
        }//END for

        this.fromArray(_resultArray);
      }


      //TODO: Add descripion
      /**
      * @private
      */
      private shiftRows(): void
      {
        var _rowTmp: Array<number>;
        var _row1: Array<number>;
        var _row2: Array<number>;
        var _row3: Array<number>;

        _row1 = this.getRow(1);
        _row2 = this.getRow(2);
        _row3 = this.getRow(3);

        _rowTmp = new Array<number>();
        _rowTmp.push(_row1[1], _row1[2], _row1[3], _row1[0]);
        this.setRow(1, _rowTmp);

        _rowTmp = new Array<number>();
        _rowTmp.push(_row2[2], _row2[3], _row2[0], _row2[1]);
        this.setRow(2, _rowTmp);

        _rowTmp = new Array<number>();
        _rowTmp.push(_row3[3], _row3[0], _row3[1], _row3[2]);
        this.setRow(3, _rowTmp);
      }


      //TODO: Add descripion
      /**
      * @private
      */
      private inverseShiftRows(): void
      {
        var _rowTmp: Array<number>;
        var _row1: Array<number>;
        var _row2: Array<number>;
        var _row3: Array<number>;

        _row1 = this.getRow(1);
        _row2 = this.getRow(2);
        _row3 = this.getRow(3);

        _rowTmp = new Array<number>();
        _rowTmp.push(_row1[3], _row1[0], _row1[1], _row1[2]);
        this.setRow(1, _rowTmp);

        _rowTmp = new Array<number>();
        _rowTmp.push(_row2[2], _row2[3], _row2[0], _row2[1]);
        this.setRow(2, _rowTmp);

        _rowTmp = new Array<number>();
        _rowTmp.push(_row3[1], _row3[2], _row3[3], _row3[0]);
        this.setRow(3, _rowTmp);
      }


      //TODO: Add descripion
      /**
      * @private
      */
      private mixColumns(): void
      {
        var _index: number;
        var _resultArray: Array<number>
        var _row0: Array<number>;
        var _row1: Array<number>;
        var _row2: Array<number>;
        var _row3: Array<number>;

        _resultArray = new Array<number>();
        _row0 = this.getRow(0)
        _row1 = this.getRow(1);
        _row2 = this.getRow(2);
        _row3 = this.getRow(3);


        for (_index = 0; _index < 4; _index++)
        {
          _resultArray.push(multiplyByTwo(_row0[_index]) ^ multiplyByThree(_row1[_index]) ^ _row2[_index] ^ _row3[_index]);
          _resultArray.push(_row0[_index] ^ multiplyByTwo(_row1[_index]) ^ multiplyByThree(_row2[_index]) ^ _row3[_index]);
          _resultArray.push(_row0[_index] ^ _row1[_index] ^ multiplyByTwo(_row2[_index]) ^ multiplyByThree(_row3[_index]));
          _resultArray.push(multiplyByThree(_row0[_index]) ^ _row1[_index] ^ _row2[_index] ^ multiplyByTwo(_row3[_index]));
        }//END for

        this.fromArray(_resultArray);
      }


      //TODO: Add descripion
      /**
      * @private
      */
      private inverseMixColumns(): void
      {
        var _index: number;
        var _resultArray: Array<number>
        var _row0: Array<number>;
        var _row1: Array<number>;
        var _row2: Array<number>;
        var _row3: Array<number>;

        _resultArray = new Array<number>();
        _row0 = this.getRow(0)
        _row1 = this.getRow(1);
        _row2 = this.getRow(2);
        _row3 = this.getRow(3);


        for (_index = 0; _index < 4; _index++)
        {
          _resultArray.push(multiplyByFourteen(_row0[_index]) ^ multiplyByEleven(_row1[_index]) ^ multiplyByThirteen(_row2[_index]) ^ multiplyByNine(_row3[_index]));
          _resultArray.push(multiplyByNine(_row0[_index]) ^ multiplyByFourteen(_row1[_index]) ^ multiplyByEleven(_row2[_index]) ^ multiplyByThirteen(_row3[_index]));
          _resultArray.push(multiplyByThirteen(_row0[_index]) ^ multiplyByNine(_row1[_index]) ^ multiplyByFourteen(_row2[_index]) ^ multiplyByEleven(_row3[_index]));
          _resultArray.push(multiplyByEleven(_row0[_index]) ^ multiplyByThirteen(_row1[_index]) ^ multiplyByNine(_row2[_index]) ^ multiplyByFourteen(_row3[_index]));
        }//END for

        this.fromArray(_resultArray);
      }


      //TODO: Add descripion
      /**
      * @private
      */
      private substituteBytes(): void
      {
        var _index: number;
        var _resultArray: Array<number>;
        var _sourceArray: Array<number>;

        _resultArray = new Array<number>();
        _sourceArray = this.toArray();

        for (_index = 0; _index < _sourceArray.length; _index++)
        {
          _resultArray.push(getSubstitution(_sourceArray[_index]));
        }//END for

        this.fromArray(_resultArray);
      }


      //TODO: Add descripion
      /**
      * @private
      */
      private inverseSubstituteBytes(): void
      {
        var _index: number;
        var _resultArray: Array<number>;
        var _sourceArray: Array<number>;

        _resultArray = new Array<number>();
        _sourceArray = this.toArray();

        for (_index = 0; _index < _sourceArray.length; _index++)
        {
          _resultArray.push(getInversSubstitution(_sourceArray[_index]));
        }//END for

        this.fromArray(_resultArray);
      }

    }//END class

  }//END module
}//END module