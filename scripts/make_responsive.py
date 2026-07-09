import os

def main():
    filepath = r"c:\Users\acer\Desktop\unifiedstack\src\app\profile\page.tsx"
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update aspect ratio and padding for print pages on screen
    old_page_pattern = 'p-12 rounded-2xl aspect-[210/297] w-full shadow-2xl'
    new_page_pattern = 'p-6 sm:p-12 rounded-2xl md:aspect-[210/297] w-full shadow-2xl min-h-[400px] md:min-h-[auto]'
    
    # 2. Update aspect ratio for Slide Deck viewer
    old_deck_pattern = 'aspect-[16/9] w-full rounded-xl border border-white/5 bg-gradient-to-br from-bg-black to-bg-dark p-8 sm:p-12 relative flex flex-col justify-between overflow-hidden shadow-inner select-none'
    new_deck_pattern = 'w-full rounded-xl border border-white/5 bg-gradient-to-br from-bg-black to-bg-dark p-6 sm:p-12 relative flex flex-col justify-between overflow-hidden shadow-inner select-none aspect-auto min-h-[320px] md:aspect-[16/9]'

    # 3. Slide 5 tech tools grid (4 cols on desktop, 2 cols on mobile)
    old_slide5_grid = '<div className="grid grid-cols-4 gap-2 mt-4">'
    new_slide5_grid = '<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">'

    # 4. Slide 7 metrics grid (3 cols on desktop, 1 col on mobile)
    old_slide7_grid = '<div className="grid grid-cols-3 gap-3 mt-4 text-center">'
    new_slide7_grid = '<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-center">'

    # 5. Slide 8 founders grid (2 cols on desktop, 1 col on mobile)
    old_slide8_grid = '<div className="grid grid-cols-2 gap-4 mt-4">'
    new_slide8_grid = '<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">'

    # 6. Page 4 Values grid (2 cols on desktop, 1 col on mobile)
    old_p4_grid = '<div className="grid grid-cols-2 gap-3">'
    new_p4_grid = '<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">'

    # 7. Page 7 Industries grid (2 cols on desktop, 1 col on mobile)
    old_p7_grid = '<div className="grid grid-cols-2 gap-4">'
    new_p7_grid = '<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">'

    # 8. Page 11 Metrics grid (3 cols on desktop, 1 col on mobile)
    old_p11_grid = '<div className="grid grid-cols-3 gap-3 mb-6">'
    new_p11_grid = '<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">'

    # 9. Capability Statement Page 2 contact grid
    old_cap_grid = '<div className="grid grid-cols-2 gap-2 text-[10px] text-white/40 font-mono">'
    new_cap_grid = '<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-white/40 font-mono">'

    # Perform replacements
    replacements = [
        (old_page_pattern, new_page_pattern),
        (old_deck_pattern, new_deck_pattern),
        (old_slide5_grid, new_slide5_grid),
        (old_slide7_grid, new_slide7_grid),
        (old_slide8_grid, new_slide8_grid),
        (old_p4_grid, new_p4_grid),
        (old_p7_grid, new_p7_grid),
        (old_p11_grid, new_p11_grid),
        (old_cap_grid, new_cap_grid)
    ]

    modified_content = content
    for old, new in replacements:
        count = modified_content.count(old)
        modified_content = modified_content.replace(old, new)
        print(f"Replaced '{old[:30]}...' -> '{new[:30]}...' (Replaced {count} occurrences)")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(modified_content)

    print("Responsive changes applied successfully.")

if __name__ == "__main__":
    main()
