import marshal
import types

def marshal_function(file, function):
  marshal.dump(function.__name__, file)
  marshal.dump(function.__code__, file)

def restore(file):
  while file.peek():
    name = marshal.load(file)
    code = marshal.load(file)
    function = types.FunctionType(code, globals())
    function.__name__ = name
    globals()[function.__name__] = function

def freeze(file_path):
  with open(file_path, 'wb') as file:
    marshal.dump(restore.__code__, file)
    for value in (x for x in globals().values() if type(x) == types.FunctionType):
      marshal_function(file, value)

# want to be able to have the image dictate how the image is marshalled

freeze('my.image')

print(globals())