module TS
{
  "use strict";

  export module Utils
  {

    class Subscription
    {
      private _event: string;
      private _callback: (context: any) => void;
      private _context: any;

      public get callback(): (eventArgs?: any) => void
      {
        return this._callback;
      }

      public get context(): any
      {
        return this._context;
      }

      public get event(): string
      {
        return this._event;
      }


      /**
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.ArgumentNullUndefOrWhiteSpaceException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      public constructor(event: string, callback: (eventArgs?: any) => void, context?: any)
      {
        TS.Utils.checkStringParameter(event, "event", "constructor of TS.Utils.Subscription");
        TS.Utils.checkFunctionParameter(callback, "callback", "constructor of TS.Utils.Subscription");
        this._event = event;
        this._callback = callback;
        this._context = context;
      }

      public equal(other: Subscription): boolean
      {
        if (!this.isSubscription(other))
        {
          return false;
        }//END if

        if ((this.callback === other.callback) && (this.context === other.context) && (this.event === other.event))
        {
          return true;
        }//END if

        return false;
      }

      /**
      * @description
      *    Checks whether the value given in argument 'subsription' is of 
      *    type 'Subscription' or not.
      */
      private isSubscription(subscription: Subscription)
      {
        if (TS.Utils.Assert.isNullOrUndefined(subscription))
        {
          return false;
        }//END if

        if (TS.Utils.Assert.isNullOrUndefined(subscription.callback))
        {
          return false;
        }//END if

        if (TS.Utils.Assert.isNullOrUndefined(subscription.context))
        {
          return false;
        }//END if

        if (TS.Utils.Assert.isNullOrUndefined(subscription.event))
        {
          return false;
        }//END if

        return true;
      }
    }


    export class Observer
    {
      // 'subscribers' will keep track of subscribers by event name
      // each event name subscribed to will be a member name on
      // this object, w/ the value as an array of objects containing
      // the subscriber callback and optional function context
      private _subscriptionArray: Array<Subscription>;

      public constructor()
      {
        this._subscriptionArray = new Array<Subscription>();
      }


      /**
      *  @throws
      *    TS.Exception
      */
      public addListener(event: string, callback: (eventArgs: any) => void, context?: any): void
      {
        try
        {
          this._subscriptionArray.push(new Subscription(event, callback, context));
        }//END try
        catch (ex)
        {
          throw new TS.Exception("The call to TS.Utils.Observer.addListener failed. See the inner exception for further details.", ex);
        }//END throw
      }


      /**
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.ArgumentNullUndefOrWhiteSpaceException
      */
      public removeListner(event: string, callback: (eventArgs: any) => void, context?: any): void
      {
        TS.Utils.checkStringParameter(event, "even", "TS.Utils.Observer.removeListner");

        TS.Linq.Enumerable.fromArray(this._subscriptionArray).where(item => item.event == event && item.callback == callback && item.context == context).forEach((item) =>
        {
          item = undefined;
        });

        this._subscriptionArray = TS.Utils.compactArray(this._subscriptionArray);
      }


      /**
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.ArgumentNullUndefOrWhiteSpaceException
      */
      public emit(event: string, eventArgs?: any): void
      {
        TS.Utils.checkStringParameter(event, "event", "TS.Utils.Observer.emit");


        TS.Linq.Enumerable.fromArray(this._subscriptionArray).where(item => item.event == event).forEach((item) => 
        {
          try
          {
            item.callback.call(((item.context.context != null) ? item.context : this), eventArgs);
          }//END try
          catch (Exception)
          {
            console.log(Exception.toString());
          }//END catch
        });
      }

    }//END class

  }//END module
}//END module 