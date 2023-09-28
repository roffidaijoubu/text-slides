def remove_blank_lines(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    # Remove any blank lines from the list of lines
    lines = [line.strip() for line in lines if line.strip()]

    with open(output_file, 'w', encoding='utf-8') as file:
        file.write("\n".join(lines))

if __name__ == "__main__":
    input_file = "input.txt"
    output_file = "output.txt"

    remove_blank_lines(input_file, output_file)
    print(f"Successfully created {output_file} by removing blank lines.")
