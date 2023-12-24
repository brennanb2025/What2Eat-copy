import csv
import json

def csv_to_json(cvsFilePath, jsonFilePath):
    data = {}

    with open(cvsFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        counter = 0
        for rows in csvReader:
            counter += 1
            if counter == 180000:
                break
            id = rows['id']
            name = rows['name']
            description = rows['description']
            ingredients = eval(rows['ingredients'])
            steps = eval(rows['steps'])
            time = int(rows['minutes'])
            # tags = eval(rows['tags'])
            data[id] = {'recipe_id':id, 'recipe_name': name,  'recipe_description': description, 'ingredients': ingredients, 'steps': steps, 'time': time}

    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))


csv_to_json("RAW_recipes.csv", "output.json")