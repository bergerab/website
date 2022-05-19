import marshal
import types

with open('my.image', 'rb') as file:
  types.FunctionType(marshal.load(file), globals())(file)

print('f')