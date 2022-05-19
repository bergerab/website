import marshal, types

def kernel(image_path, globals):
  def unmarshal_function(file):
    nonlocal globals
    name = marshal.load(file)
    code = marshal.load(file)
    function = types.FunctionType(code, globals)
    function.__name__ = name
    return function

  def restore(file_path):
    nonlocal globals
    with open(file_path, 'rb') as file:
      while file.peek():
        function = unmarshal_function(file)
        globals[function.__name__] = function

  restore(image_path)
