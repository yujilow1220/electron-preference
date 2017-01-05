# electron-preference
This module offers App-Preference functions and screen on your Electron Application easily!

##Installation

```
$ npm install electron-preference
```

##How to use

###Pre-requirements

You need make a JSON-defined column into your electron-application project folder.

For example:

```preference.json
[
  {
    "name":"Tab1",
    "items":[
    {
      "name":"checkbox1",
      "text":"checkbox1",
      "description":"Please check if you are lucky!",
      "type":"checkbox",
      "default":"true"
    },
    {
      "name":"text1",
      "text": "first name",
      "description":"Your First Name",
      "type": "text",
      "default":"takuya"
    },
    {
      "name":"text2",
      "text":"last name",
      "description":"Your Last Name",
      "type": "text",
      "default":"takahashi"
    }]
  },{
    "name":"Tab2",
    "items":[
      {
        "name":"birthday",
        "type":"date",
        "default":"1992-12-20"
      }
    ]
  }
]
```

Only text, checkbox, date are supported so far.

Then, you need write this code on your ```main.js ```.

```
const preference = require('electron-preference');
preference.load('path/to/preference.json');
```

###Display preference

Only you need is writing this code.

```
preference.show();
```

The shortcut ```Cmd+,``` is good practice to use Preference with MacOS.

Finally, this window will appear.

<img src="https://lh3.googleusercontent.com/eNSMFHH6_Zoh5LmBVumX0xBfKoKlgkdR8dJrmFwJYXZIZylbSBIU-K8GVC-_Qe4jF80P0as8OSdTkhI8Kq94UsvzDItMytGy6HobmBRUT9MUo_W8fTjBH5oJTy1Sh8GwlAV581jL9LnwMoZOkaOdlMFpoPEfDOec8kQtW2bwMD0DpyDjKi2ZRlLg2C0UzMMm2M-gixjNIu2KV8hIeZWey2jBNPmEFh8_G-yBJDe4k5zyhzAPk4CU3vPB6Jl9qkIJSUpKtUleS8tWEvsFhMI9BpjomdyNxHWNqU2kqp2S-fNVmr950tI0PxkNxEcTyiSDQ3GOlUp_Ht15K-HuzrdXk6JI2MUfD2vZJUo6_Xl4qROhqSo0lLEVnP57eBQy1-rjR6F4oP0GgW9kmDzWyQx0XNPY-rbS8IwZtZjC20cWYaT_B4Msn8bQk1Fm8yy1_KJTKuYoSFjZEmWT7J_MicvxiyX2vt5Hg00Z8lUVjeFurbMBGMf4s0-pMCI0cFV7kmn4pW2KbkvltHB6tRDrEsyddYEt29mEMlGJPhbC2c31F9s4gquMRZ7fQzW6bakJ6wpPgJa7QYcheOFe7rO0S_FcRBPWilm-IKxRbAmm-y4pAIXsAaru0XzG=w2624-h1824-no">

###Getting preference data

You can access preference data with this code.

```
preference.get(function(data){
  // type your code
});
```

You will get this ```Object```:

```
{
  "Tab1":{
    "checkbox1":true,
    "text1":"takuya",
    "text2":"takahashi"
  },
  "Tab2":{
    "birthday":"1992/12/20"
  }
}

```

##Thanks

I used this theme! THANK YOU!

https://github.com/VinceG/Bootstrap-Admin-Theme-3

##License

MIT
