class TS_Security_Counter_test
{
  private _CTR: TS.Security.Counter;

  public get next(): number
  {
    return this._CTR.nextCounter;
    //var _resultArray = this._CTR.next.toArray();
    //var _resultNumberArray = _resultArray.slice(12);
    //var _resultNumber = TS.Utils.byteArrayToUnsignedNumber(_resultNumberArray);
    //return _resultNumber;
  }

  public get nonce(): Array<number>
  {
    return this._CTR.nonce;
  }


  constructor(initialValue: number)
  {
    this._CTR = new TS.Security.Counter(initialValue);
  }


}

class PageManager
{
  private _TS_Security_Counter_test: TS_Security_Counter_test;
  private OUT_CounterInitialValue : HTMLSpanElement;
  private OUT_CounterCurrentValue : HTMLSpanElement;
  private OUT_CounterCounts : HTMLSpanElement;
  private OUT_CounterNonce : HTMLSpanElement;
  private INP_StartValue : HTMLInputElement;
  private BTN_Start: HTMLButtonElement;
  private BTN_Stop: HTMLButtonElement;
  private _timerHandle: number;
  private _counts: number;
  private _exception: boolean;

  constructor()
  {
    this.init();
  }

  public init(): void
  {
    this.OUT_CounterInitialValue = <HTMLSpanElement> document.querySelector("#OUT_CounterInitialValue");
    this.OUT_CounterCurrentValue = <HTMLSpanElement> document.querySelector("#OUT_CounterCurrentValue");
    this.OUT_CounterCounts = <HTMLSpanElement> document.querySelector("#OUT_CounterCounts");
    this.OUT_CounterNonce = <HTMLSpanElement> document.querySelector("#OUT_CounterNonce");
    this.INP_StartValue = <HTMLInputElement> document.querySelector("#INP_StartValue");
    this.BTN_Start = <HTMLButtonElement> document.querySelector("#BTN_Start");
    this.BTN_Stop = <HTMLButtonElement> document.querySelector("#BTN_Stop");

    this.INP_StartValue.addEventListener("keyup", (event) => this.INP_StartValue.style.backgroundColor = "");
    this.BTN_Start.addEventListener("click", (event: PointerEvent) => { this.start(); });
    this.BTN_Stop.addEventListener("click", (event: PointerEvent) => { this.stop(); });
  }

  public stop(): void
  {
    console.timeEnd("COUNTER PROCESS");
    performance.mark("STOPPING COUNTER PROCESS")
    if (!TS.Utils.Assert.isNullOrUndefined(this._timerHandle))
    {
      clearInterval(this._timerHandle);
    }//END if
    this.BTN_Start.disabled = false;
    this.INP_StartValue.disabled = false;
    this.BTN_Stop.disabled = true;
  }

  public start(): void
  {
    if (!this.validate())
    {
      this.INP_StartValue.style.backgroundColor = "red";
      return;
    }//END if
    this.INP_StartValue.style.backgroundColor = "";
    this.BTN_Start.disabled = true;
    this.INP_StartValue.disabled = true;
    this.BTN_Stop.disabled = false;
    console.time("COUNTER PROCESS");
    performance.mark("STARTING COUNTER PROCESS");
    this._exception = false;
    this._counts = 0;
    this._TS_Security_Counter_test = new TS_Security_Counter_test(parseInt(this.INP_StartValue.value));
    this.OUT_CounterNonce.innerHTML = this._TS_Security_Counter_test.nonce.join("|");
    this.OUT_CounterInitialValue.innerHTML = this.INP_StartValue.value;
    this._timerHandle = setInterval(this.process.bind(this), 0);
  }


  private validate(): boolean
  {
    var _value: number;

    try
    {
      _value = parseInt(this.INP_StartValue.value);
    }//END try
    catch (e)
    {
      return false;
    }//END catch

    if (!TS.Utils.Assert.isUnsignedIntegerNumber(_value))
    {
      return false;
    }//END if

    if (_value > 0xFFFFFFFF)
    {
      return false;
    }//END if

    return true;
  }

  public process() : void
  {
    if (this._exception)
    {
      return;
    }//END if

    try
    {
      var _next = this._TS_Security_Counter_test.next;
    }//END try
    catch (Exception)
    {
      this._exception = true;
      this.stop();
      window.alert("Application stopped because of the following exception, \r\n Type = " + (<TS.Exception> Exception).type + ",\r\n Message = " + (<TS.Exception> Exception).message);
      return;
    }//END catch

    this._counts++;
    this.OUT_CounterCurrentValue.innerHTML = _next.toString();
    this.OUT_CounterCounts.innerHTML = this._counts.toString();
  }
}

window.addEventListener("load", (event: MouseEvent) => { new PageManager(); });