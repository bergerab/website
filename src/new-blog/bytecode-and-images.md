# Images for Fun!

Image-based programming is a nearly-lost art that has untapped potential. I wouldn't suppose many people even know about the concept anymore, and the people are not to blame. It was most popular in implementations of LISPs, Forths and SmallTalk, which popular consensus deems unused and dead. I wouldn't bet it is taught or ever was taught in many universities either. The closest you can get to image-based programming in the wild are databases like SQL and spreadsheet software.

To me, image-based programming is whenever you consider a program's runtime as a freezable and restorable entity. You can make the idea as dramatic as you'd like. You can freeze just global variables, or you could take it to absolute zero where every last drip of state can be frozen (including call stacks and instruction pointers). Depending on how dramatic you like to be, this could be done with any programming language (e.g. conceptually in Python `marshal.dumps(globals(), file)`). But the most extreme and most effective implementations are done using programming languages that are built from the ground up with support for images. This idea likely sounds too simple to be powerful, but this is all that is needed.

## Image Support for Python
You don't need a special language to support and use images. In Python, you can roll your own support for images that freeze and restore global variables using Python's `globals()` and the `marshal` module. `globals()` allows you to get and set global variables, and `marshal` allows you to write many Python types to a binary format (that is strongly tied to the specific version of CPython you are using). This isn't overwhelmingly useful, but it can build some motivation for how images can be used.

Image support can start by worrying about writing the image first. The Python code below writes an image called `my.image` which contains all global functions defined in the module. This image will include the very functions which were used to write the image itself: `marshal_function` and `freeze`. This is a one-time step to generate an initial image.

```py
import marshal, types

def marshal_function(file, function):
  marshal.dump(function.__name__, file)
  marshal.dump(function.__code__, file)

def freeze(file_path):
  with open(file_path, 'wb') as file:
    for function in (x for x in globals().values() 
                        if type(x) == types.FunctionType):
      marshal_function(file, function)

freeze('my.image')
```

After the `my.image` file has been made, you no longer need `marshal_function` and `freeze`, because they are stored in `my.image`. The only concern now is to read the image. This is done by performing the opposite operations we did to write the image with `unmarshal_function` and `restore`. After `restore('my.image')`, `freeze` and `marshal_function` are loaded back into `globals()` even though they are not present in the source code. You could call the restore code here the "kernel", it could be used as the central code used to load the image. This kernel would be used for any file that uses this tiny image-base programming library.

```py
import marshal, types

def unmarshal_function(file):
  name = marshal.load(file)
  code = marshal.load(file)
  function = types.FunctionType(code, globals())
  function.__name__ = name
  return function

def restore(file_path):
  with open(file_path, 'rb') as file:
    while file.peek():
      function = unmarshal_function(file)
      globals[function.__name__] = function
```

If you evaluate this file in a CPython REPL, you can interactively program with an the `my.image` image. You can load the image, create new functions, then freeze it when you're done. The state of all global functions can be saved off in one REPL session, and restored back in a seperate session.

```sh
$> python
>>> ...load kernel...
>>> restore('my.image')
>>> def foo(): print('bar')
>>> freeze('my.image')
>>> exit()
$> python
>>> ...load kernel...
>>> restore('my.image')
>>> foo()
bar
>>>
```

This mini-library allows programs to be made within the REPL. You can directly enter functions to the REPL, and saving the state of the REPL is as easy as calling `freeze`. Sessions can be restored via `restore`. Executable programs can be run by distributing the image file, and writing a small driver file (that loads the kernel, `restore(...)`, then calls a `main` function).

There are some clear disadvantages to this library. One being that once you load a function into the image, you lose the source code. There is no way of viewing what a function does, other than running the function. This is a limitation of our small library. It is possible that functions would persist the source code, to allow viewing, and exporting of all function sources (this is feature exists in many SmallTalk implementations).

There is a problem with conducting open-brain surgery on yourself. If you make a single mistake, you won't have a surgeon to save you. You will have rendered both the patient and the surgeon useless at the same time. It's much better to have a 

It seems like a great alternative to use for implementing dynamic languages if you would have otherwise thought to compile to a typical bytecode format. CPython, EMACS LISP, Ruby, and Lua all have a similar bytecode format for their compiled code. They isolate subroutine into objects that are written to a binary file that contain bytecode instructions, and a "constants vector". The bytecode instructions provide a way of indexing the constants vector, as well as whichever registers or stacks the implementation provides. 

This can be seen as making two different formats: one format is for representing objects in the implementation (e.g. numbers, strings, lists, subroutines), and another format is for representing the bytecode instructions (bytecode). The formats can collide if an implementation has a special object for storing bytecode instructions them

For example, this is roughly the 