#TS - A TypeScript module collection

This project is a collection of some TypeScript modules which I wrote. Most of them are reprogrammed modules which are already available in some other JavaScript libraries. I don't like that plain JavaScript libraries very much, because often enough they come with a bad coding style. I have the hope and vision that there will be  more libraries which are written in TypeScript in the first place in the future. My hope is, that this will bring a more professional coding style to the JavaScript community.

The first module which I created is a LINQ implementation in TypeScript. I'm a great fan of LINQ in C#, so that was an natural choice to start with. There is more information about this project at the project page available.

[http://lord-saumagen.github.io/TS/](http://lord-saumagen.github.io/TS/)

##Prerequisites

In order to use the modules from that project, you need to install the TypeScript compiler. You will find all you need at the TypeScript project page. 

[http://www.typescriptlang.org/](http://www.typescriptlang.org/)

##Usage

If you want to use some or all of the modules in you own TypeScript project, you must download the corresponding TypeScript files and copy to your project directory. Make sure that they get compiled with your own code and that's it. If you use Visual Studio together with the "*TypeScript Tools for Visual Studio*", you don't even have to bother how to compile your TypeScript files. You will find that tools at the '*Visual Studio Gallery*'.

[https://visualstudiogallery.msdn.microsoft.com/](https://visualstudiogallery.msdn.microsoft.com/)

Visual Studio in combination with the TypeScript tools for Visual Studio is the most advanced TypeScript development setup available today. If you once experienced the full power of that dynamic duo, you will never want to miss them.

The whole project was created with "**Visual Studio 2013 for Web**". The TypeScript itself compiles against the TypeScript compiler in version 1.0 as defined in the setting in the projet file:  '**&lt;TypeScriptToolsVersion&gt;1.0&lt;TypeScriptToolsVersion&gt;**'. With this set up you should be able to open the project and start a compiler run. 

##Version

This is Version 1.0 of the TypeScript module collection. This version is productions stable and runs under the TypeScript version 1.0. 

Development on this version is cancelled with the release of version 1.0. However, there will be more releases running under TypeScript versions higher than 1.0. That releases will make use of new TypeScript features and won't be backward compatible. 
##License

This software is licensed under the [Open Software License version 3.0](http://opensource.org/licenses/OSL-3.0 "Open Software License version 3.0")

&copy; lord.saumagen@gmail.com, 2014 

The full license is also part of the project an can be found in "Documentation" directory in file "OSL_V3.0.html".
