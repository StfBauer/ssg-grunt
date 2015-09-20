# Simple Style Guide - Grunt Task
This tool is the generator to build a 'Simple Style Guide'. It handles all the configuration changes.
## How it works
This task search for html files under a defined path an writes the basis information to a `pattern.conf.json` file. This is the core configuration file to build the simple style guide upon.
## Configuration
The following configuration options are available.

```js
    grunt.initConfig({
        config: {
            app: '.'
        },
        simpleStyleGuide: {
            patterns: '<%= config.app %>/_pattern',
            patternConfig: '<%= config.app %>/patterns.json'
        }
    });
```
- *config* defines the base folder for your app
- *filePath* defines the location where are html sippets are stored.
- *patternConfig* define the location where the json configuration should be stored.

## Folder Locations
This task generates two folders. Beside the folder containing the patterns and html snippet a folder for the documentation will be generated. In case of the default generation '.doc' will be appended default folder.
The documentation that can be stored there has the same structure as the patterns folder. The stored json files in this folder matches the filename in the patterns folder.

For example. If the patterns folder contain a file named 'typography.html' the same file can be found in the documentation folder as 'typography.html.json'.
## Sample Configuration - patterns.conf.json
The following section shows the default configuration of a pattern. All items are stored inside an array.

```
{
    "lastModfied": "2015-09-20T12:50:44.675Z",
    "items": [
        {
            "title": "test",
            "description": "",
            "filename": "test.html",
            "filepath": "/test.html",
            "folder": "/_pattern",
            "found": true
        }
    ]
}
```
'lastModifed' will be used by the user interface to identify if the user interface needs to be rebuilt. Items contain all the required information to render the user interface. 'name' and 'description' inside the items will automatically set by the pattern configuration update.
## Sample Configuration - Documentation file
The JSON Object stored in the configuration file contains the following properties.

```
{
    "name": "test",
    "description": "This is just a test file"
}
```

- *name* - stores a friendly display name of the pattern
- *description* - will use to show an annotation beneath the pattern


## Integration in Yeoman
This task can be registered as a separate task inside the watch.

```
watch: {
		…
        styles: {
            files: ['<%= config.app %>/styles/{,*/}*.css'],
            tasks: ['newer:copy:styles', 'postcss']
        },
        pattern: {
            files: ['<%= config.app %>/_pattern/**/*.html'],
            tasks: ['simpleStyleGuide']
	       }
		…
}
```
Make sure the path defined in the watch definition matches the one in your simpleStyleGuide definition.
# The MIT License (MIT)
Copyright (c) 2013 Stefan Bauer [@Stfbauer](http://twitter.com/StfBauer)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
