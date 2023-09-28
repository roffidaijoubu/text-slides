import json

def parse_dua_file(filename):
    dua_list = []
    with open(filename, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    # Check if there are enough lines to create a complete dua set (Arabic, Transliteration, Indonesian)
    if len(lines) % 3 != 0:
        print("Error: Incomplete dua set found in the file.")
        return dua_list

    # Group the lines in sets of 3 (Arabic, Transliteration, Indonesian)
    for i in range(0, len(lines), 3):
        arabic = lines[i].strip()
        transliteration = lines[i + 1].strip()
        indonesian = lines[i + 2].strip()

        dua_entry = {
            "ar": arabic,
            "tr": transliteration,
            "id": indonesian
        }

        dua_list.append(dua_entry)

    return dua_list

def save_to_json(filename, data):
    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    input_file = "dua.txt"
    output_file = "dua.json"

    dua_list = parse_dua_file(input_file)

    if dua_list:
        save_to_json(output_file, dua_list)
        print(f"Successfully created {output_file} with {len(dua_list)} entries.")
