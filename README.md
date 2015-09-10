#TS - A TypeScript module collection

This project is a collection of some TypeScript modules which I wrote. Most of them are reprogrammed modules which are already available in some other JavaScript libraries. I don't like that plain JavaScript libraries very much, because often enough they come with a bad coding style. I have the hope and vision that there will be  more libraries which are written in TypeScript in the first place in the future. My hope is, that this will bring a more professional coding style to the JavaScript community.

The first module which I created is a LINQ implementation in TypeScript. I'm a great fan of LINQ in C#, so that was an natural choice to start with. There is more information about this project at the project page available.

[http://lord-saumagen.github.io/TS/](http://lord-saumagen.github.io/TS/)

With version 1.0.2 of this module collection the LINQ implementation is considered complete. I'm currently working on the 'Security' and 'Encoding' modules. At the time of this writing they will only have one or two basic implementations but they will grow over time.

**2015-09-10**

This is version 1.0.3.5 of this module collection an also the last update to this project. This project is 
hereby closed and not longer under development. I decided to switch to the TypeScript 1.5.3 compiler which comes with Visual Studio 2015. So I'm planning to create a new project. I will continue to expand the existing modules in that project or create new ones, but they will not be backward compatible. 

You will find further information on this update in the <a href="#Version">Version</a> paragraph below.
##Prerequisites

In order to use the modules from that project, you need to install the TypeScript compiler. You will find all you need at the TypeScript project page. 

[http://www.typescriptlang.org/](http://www.typescriptlang.org/)

##Usage

If you want to use some or all of the modules in you own TypeScript project, you must download the corresponding TypeScript files and copy to your project directory. Make sure that they get compiled with your own code and that's it. If you use Visual Studio together with the "*TypeScript Tools for Visual Studio*", you don't even have to bother how to compile your TypeScript files. You will find that tools at the '*Visual Studio Gallery*'.

[https://visualstudiogallery.msdn.microsoft.com/](https://visualstudiogallery.msdn.microsoft.com/)

Visual Studio in combination with the TypeScript tools for Visual Studio is the most advanced TypeScript development set up available today. If you once experienced the full power of that dynamic duo, you will never want to miss them.

The whole project was created with "**Visual Studio 2013 for Web**". All releases up to version 1.0 compile against the TypeScript compiler in version 1.0.3.0 The corresponding setting in the project file is:  '**&lt;TypeScriptToolsVersion&gt;1.0&lt;TypeScriptToolsVersion&gt;**'. With this set up you should be able to open the project and start a compiler run. 

Starting with version 1.0.2 of this module collection the TypeScript compiler in version 1.3.0.0 is used. That 1is the version which came with the "[TypeScript 1.3 for Visual Studio 2013](https://visualstudiogallery.msdn.microsoft.com/955e0262-0858-40c9-ab5a-1acc680e9bfd "TypeScript 1.3 for Visual Studio 2013")" set up. Some genius member of the development team came up with the glorious idea to make the setting in the project file independent form the compiler version. Now the setting in you project file must read:  '**&lt;TypeScriptToolsVersion&gt;1.1&lt;TypeScriptToolsVersion&gt;**' in order to compile against the 1.3.0.0 compiler. 

If you  are not sure which compiler you are currently using, you can proof by running the 'tsc.exe' file with the '-v' switch set. 

![](http://lord-saumagen.github.io/TS/tsc_version.png)

##<a name="Version"></a>Version

**2015-09-10**

This is version 1.0.3.5 of the module collection. This version contains some bug-fixes and an implementation of the AES cryptography algorithm as described in the document: 

"[ADVANCED ENCRYPTION STANDARD (AES)](http://csrc.nist.gov/publications/fips/fips197/fips-197.pdf "ADVANCED ENCRYPTION STANDARD (AES)")"  

That document is public available by the National Institute of Standards and Technology (NIST).

I also implemented a basic set of operation modes for the AES implementation. The implementation of the operation modes follows the description in the document: 

"[Recommendation for Block Cipher Modes of Operation](http://csrc.nist.gov/publications/nistpubs/800-38a/addendum-to-nist_sp800-38A.pdf "Recommendation for Block Cipher Modes of Operation")"

That document is also public available by the National Institute of Standards and Technology.

##License

This software is licensed under the [Open Software License version 3.0](http://opensource.org/licenses/OSL-3.0 "Open Software License version 3.0")

&copy; lord.saumagen@gmail.com, 2014 

The full license is also part of the project an can be found in "Documentation" directory in file "OSL_V3.0.html".
