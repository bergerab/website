import marshal
import types
IMAGE_PATH = 'my.image'
with open(IMAGE_PATH, 'rb') as file:
  types.FunctionType(marshal.load(file), globals())(file)

def add_one(x): return x + 1
def save(): freeze(IMAGE_PATH)
save()