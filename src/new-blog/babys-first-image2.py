import marshal
import types

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
      globals()[function.__name__] = function

restore('my.image') # this bootstraps the image
print(globals())