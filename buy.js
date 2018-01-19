
const program = require('commander');
//set the account we care about.
var accountname = "BTC Wallet"

// Require logic.js file and extract controller functions using JS destructuring assignment

program
  .version('0.0.1')
  .description('Opendime Savings Bot');

//get the balance of the account.
program
.command('balance <apikey> <apisecret>')
  .alias('a')
  .description('check balance')
  .action((apikey,apisecret) => {
   
    /*
    //debug
    console.log(apikey)
    console.log(apisecret)
    console.log('=======================')
    return;
    */

    //connect to coinbase
    var Client = require('coinbase').Client;
    var client = new Client({'apiKey': apikey.toString(), 'apiSecret': apisecret.toString()});
    //get the accounts
    client.getAccounts({}, function(err, accounts) 
    {
      //loop through the accounts
      accounts.forEach(function(acct) 
      {
        //check we are accessing primary acount (we could make this dynamic)
        if (acct.name == accountname)
        {
          console.log("BTC Balance: "+acct.balance.amount);
          console.log("Native Balance: £"+acct.native_balance.amount);          
        }
      });
     });
  });

program
  .command('buy <btcaddress> <amount> <day> <apikey> <apisecret> <live>')
  .alias('a')
  .description('Start by')
  .action((btcaddress,amount,day,apikey,apisecret,live) => {
   
    //set the tick interval to 1 hour.
    var tick = 1000 * 60 * 60;
    //debug to 1 second
    //tick = 1000

    //loop so that we check every hour
    setInterval(function()
    {  

      //get todays day
      var d = new Date();
      //get todays day
      var n = d.getUTCDate();
      if (day == n)
      {
         console.info('it is buy time');
        /*
        debug
        console.log(apikey.toString()) 
        console.log(apisecret.toString()) 
        */

        //connect to coinbase
        var Client = require('coinbase').Client;
        var client = new Client({'apiKey': apikey.toString(), 'apiSecret': apisecret.toString()});
        client.getAccounts({}, function(err, accounts) 
        {
          //loop the acccounts
          accounts.forEach(function(acct) 
          {
            //debug
            //console.log(acct.name)

            //check if this is the correct account
            if (acct.name == accountname)
            {
              //some info
              console.log("BTC Balance: "+acct.balance.amount);
              console.log("Native Balance: £"+acct.native_balance.amount); 
              console.log(amount)
              //check if we have enough in the account to send out.
              if (parseFloat(acct.native_balance.amount) > parseFloat(amount))
              {

                //there is enough to send.
                console.log('Enough funds sending to address sending');

                /*  
                *  WARNING IF LIVE IS SET TO 1 IT WILL TRANSFER COINS OUT OF YOUR COINBASE ACCOUNT
                */

                //check if its live
                if (live == 1)
                {
                  //send it to the BTC address
                  acct.sendMoney({'to': btcaddress,
                         'amount': amount,
                         'currency': 'BTC',
                         'idem': ''}, function(err, tx) {
                    //console.log(tx);
                    console.log('coin has been sent tov'+btcaddress);
                    //note (chris) kind of funky way to do it but this will mean we do not send again today by chaning the day to a point that cannot be meet
                    //we could also just close the app this would also work or use a lock file to check if we should buy or not.
                    day = day-1;
                  });
                }
                else
                {
                  //inform the user that we did not transfer anything to 
                  console.log('I did not transfer as we are not in live mode')
                }
              }    
              else
              {
                //todo : We have to add the buy functionality this has been left out on purpose for now
                console.log('Not enough funds. I will buy for you later once tested')
              }     
            }
          });
         });
        }
      }, tick);

  });


program.parse(process.argv);
