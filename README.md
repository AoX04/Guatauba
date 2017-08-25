**Guatauba**
===================

A decent and **easy** to use Nodejs mail-server including a **web-mail** client that does not suck.

Using [Sailsjs](http://sailsjs.org) + [Waterline ORM](https://github.com/balderdashy/waterline) so its database agnostic.

Based on [smtp-server](https://github.com/andris9/smtp-server) 

----------


Current status
-------------

Early stage of development, use at your own risk , right now its nothing more than a demo.

No security policies/revisions so far.

------

How to use?
----------
 **Clone project from github:**

>  git  clone  git@github.com:AoX04/Guatauba.git

>  cd Guatauba

**Install dependencies:**
>  NPM install

**Run the app**
> sudo node app.js

> // This is dangerous, the reason why sudo permissions is  needed, is because port 25 access is sudo protected, before the first stable release i will be adding a way configure a new port and rebind it to 25.

The web-mail application will be runing on port 1337, and listening to port 25 for incoming emails.
Rigth now the app need to be run as sudo, since needs access to port 25, on the near future port binding support needs to be added.


---------

Project goals
-----

- Be a simple and secure, fast to deploy mail server.

- Intended for light use, low traffic.

- A world where no one have to deal with postfix weird and awkward user creation.

- Testing automatic build with https://github.com/nlf/node-github-hook 3
