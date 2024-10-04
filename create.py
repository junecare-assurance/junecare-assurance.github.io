import os

def create_files(site, bg_color, element_color, url):
    # Remplacer les espaces par des underscores
    site_name = site.replace(' ', '_')
    
    # Créer les noms de fichiers
    js_filename = f"{site_name}_display.js"
    html_filename = f"{site_name}_popup.html"
    tampermonkey_filename = f"{site_name}_display_tampermonkey.js"
    
    # Lire les fichiers originaux
    if protection == "1":
        with open('display_event_info_popup.js', 'r') as js_file:
            js_content = js_file.read()
        
        with open('popup.html', 'r') as html_file:
            html_content = html_file.read()
        
        with open('tampermonkey.js', 'r') as tampermonkey_file:
            tampermonkey_content = tampermonkey_file.read()

    else:
        with open('display_popup_protection.js', 'r') as js_file:
            js_content = js_file.read()
        
        with open('popup_protection.html', 'r') as html_file:
            html_content = html_file.read()
        
        with open('tampermonkey.js', 'r') as tampermonkey_file:
            tampermonkey_content = tampermonkey_file.read()
    
    # Modifier le contenu du fichier JS
    js_content = js_content.replace("popup.style.backgroundColor = 'color';", 
                                    f"popup.style.backgroundColor = '{bg_color if bg_color.startswith('#') else '#' + bg_color}';")
    js_content = js_content.replace("payButton.style.backgroundColor = 'color';", 
                                    f"payButton.style.backgroundColor = '{element_color if element_color.startswith('#') else '#' + element_color}';")
    js_content = js_content.replace("button.style.backgroundColor = 'color';", 
                                    f"button.style.backgroundColor = '{element_color if element_color.startswith('#') else '#' + element_color}';")
    
    # Vérifier et remplacer les lignes existantes
    js_content = js_content.replace("fetch('https://igorpotard.github.io/popup_protection.html?v='+ new Date().getTime())", 
                                    f"fetch('https://igorpotard.github.io/{html_filename}?v='+ new Date().getTime())"
    
    js_content = js_content.replace("popup.style.backgroundColor = '#F0EBFD';", 
                                    f"popup.style.backgroundColor = '{bg_color if bg_color.startswith('#') else '#' + bg_color}';")
    js_content = js_content.replace("payButton.style.backgroundColor = '#0079CA';", 
                                    f"payButton.style.backgroundColor = '{element_color if element_color.startswith('#') else '#' + element_color}';")
    js_content = js_content.replace("button.style.backgroundColor = '#0079CA';", 
                                    f"button.style.backgroundColor = '{element_color if element_color.startswith('#') else '#' + element_color}';")
    
    # Modifier le contenu du fichier HTML
    html_content = html_content.replace("color:color;", 
                                        f"color:{element_color if element_color.startswith('#') else '#' + element_color};")
    html_content = html_content.replace("color:#0079CA;", 
                                        f"color:{element_color if element_color.startswith('#') else '#' + element_color};")
    
    # Modifier le contenu du fichier Tampermonkey
    base_url = '/'.join(url.split('/')[:4])
    tampermonkey_content = tampermonkey_content.replace("// @match        https://feverup.com/purchase/*", 
                                                        f"// @match        {base_url}/*")
    tampermonkey_content = tampermonkey_content.replace("script.src = 'https://igorpotard.github.io/display_event_info_popup.js?v=' + new Date().getTime();", 
                                                        f"script.src = 'https://igorpotard.github.io/{js_filename}?v=' + new Date().getTime();")
    
    # Écrire les nouveaux fichiers
    with open(js_filename, 'w') as new_js_file:
        new_js_file.write(js_content)
    
    with open(html_filename, 'w') as new_html_file:
        new_html_file.write(html_content)
    
    with open(tampermonkey_filename, 'w') as new_tampermonkey_file:
        new_tampermonkey_file.write(tampermonkey_content)
    
    print(f"Fichiers créés : {js_filename}, {html_filename}, {tampermonkey_filename}")

# Demander les informations à l'utilisateur
site = input("Site cible: ")
bg_color = input("Couleur de fond: ")
element_color = input("Couleur des éléments: ")
protection = input("Si annulation mettre 1 si protection mettre 2 :")
url = "test/test/test"#input("URL du site à modifier (exemple: https://feverup.com/purchase/139634/0af17ad4-5ff8-4e29-b578-38525453d633): ").rsplit('/', 1)[0] + '/*'

# Créer les fichiers avec les informations fournies
create_files(site, bg_color, element_color, url)
