import marshal
import types

def marshal_function(file, function):
  marshal.dump(function.__name__, file)
  marshal.dump(function.__code__, file)

def unmarshal_function(file):
  name = marshal.load(file)
  code = marshal.load(file)
  function = types.FunctionType(code, globals())
  function.__name__ = name
  return function

def freeze(file_path):
  with open(file_path, 'wb') as file:
    for function in (x for x in globals().values() 
                        if type(x) == types.FunctionType):
      marshal_function(file, function)

def restore(file_path):
  with open(file_path, 'rb') as file:
    while file.peek():
      function = unmarshal_function(file)
      globals()[function.__name__] = function

freeze('my.image')
restore('my.image')

print(globals())