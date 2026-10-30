import re

path = 'd:/Aischolars/interior-designe/src/pages/About.jsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Try multiple patterns for the old address
patterns = [
    r'desc="Shop No\. 1, Block No\. 4, Cloth Market, GG Hospital, Sanjay Palace, Sanjay Place, Civil Lines, Agra – 282002\. Open 24 Hours\.?"',
    r'desc="Shop No\. 1, Block No\. 4, Cloth Market, GG Hospital, Sanjay Palace, Sanjay Place, Civil Lines, Agra - 282002\. Open 24 Hours\.?"',
]

replaced = False
for pattern in patterns:
    if re.search(pattern, content):
        new = 'desc="G-8, near ICICI bank, Sanjay Palace, Sanjay Place, Civil Lines, Agra – 282002. Open 24 Hours."'
        content = re.sub(pattern, new, content)
        replaced = True
        print(f"Replaced using pattern: {pattern[:50]}...")
        break

if replaced:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('File updated successfully')
else:
    # Show what's actually in the desc
    m = re.search(r'desc="[^"]*"', content)
    if m:
        print('Current desc:', repr(m.group()[:150]))
    else:
        print('No desc found')