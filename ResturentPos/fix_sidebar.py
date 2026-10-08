import sys

filepath = r'e:\Saylani_Internship\ResturentPos\src\components\layout\Sidebar.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the invalid backslash escaping in the JSX string
content = content.replace(r"\'", "'")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed backslash escaping in Sidebar.jsx')
