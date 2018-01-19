# opendimesavingsscript

This is a simple savings bot for the Opendime credit stick https://opendime.com/

The reason I coded this is because I use Opendime to save money for my Niece and Nephew and I wanted to move at set amount each month from them into BTC.  Of course you do not have to use opendime you can send to any account.

I do not recomend you do use this unless you have at least a basic understanding of BTC and or Node.js

Prereqs

Make sure you have Node.js installed https://nodejs.org/en/

A Coinbase account https://www.coinbase.com/join/5a2a56453ce93100d21973f4

Create a Coinbase app https://www.coinbase.com/settings/api give it access to read account, transfer and buy funds

Usage

Open a terminal in mac or get super putty in Windows, Unix guys you know what to do.


in terminal type

 node buy.js buy btcaddress amount day apikey apisecret live

 btcaddress : The address of the opendime account you want to send to

 amount : The amount of BTC you want to send

 day : The day of the month you want to make the transfer

 apikey : Coinbase API key (the one you got when you created the app) NEVER SHARE THIS WITH ANYONE

 apisecret : Coinbase API Secret (the one you got when you created the app) NEVER SHARE THIS WITH ANYONE

 live : Do the transfer if you set it to 0 it will not do the transfer if you set it to 1 it will

 TO DO

 Add buy support (from credit card / bank transfer)
