import os
import json
from copy import deepcopy

from bs4 import BeautifulSoup, NavigableString

def convert(html):
    soup = BeautifulSoup(html, 'html.parser')
    rows = soup.find('tbody').find('tbody').find_all('tr')

    assert not (len(rows) % 2), 'Uneven length'
    
    names = rows[::2]
    del rows[::2]
    colours = rows 

    _dict = {}

    for names, colours in zip(names, colours):
        names = names.find_all('td')
        colours = colours.find_all('td')
        for name, colour in zip(names, colours):
            name = ' '.join(name.find('a').get_text().split())
            colour = colour.get('style')[11:18]

            _dict[name] =  colour
    
    return _dict

if __name__ == '__main__':
    colours = {}
    for colour in os.listdir('input'):
        with open(os.path.join('input', colour), 'r') as file:
            colours[colour.replace('.html', '')] = convert(file.read())
    
    _storage = []
    for x_primary_colour in colours.keys():
        for secondary_colour in colours[x_primary_colour].keys():

            something_has_been_deleted = False

            for y_primary_colour in colours.keys():
                if secondary_colour in colours[y_primary_colour].keys():
                    if y_primary_colour != x_primary_colour:
                        del colours[y_primary_colour][secondary_colour]
                        something_has_been_deleted = True
            
            if something_has_been_deleted:
                _storage.append((x_primary_colour, secondary_colour))
    
    for primary_colour, secondary_colour in _storage:
        del colours[primary_colour][secondary_colour]

    with open('output.json', 'w') as file:
        file.write(json.dumps(colours))


    
