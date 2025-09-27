#!/usr/bin/env python3

# Python 3 server example
from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import random

hostName = "0.0.0.0"
serverPort = 8080

DATA="""
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Generátor &quot;náhodných&quot; čísel</title>
<style>
body {{
  display: flex;
  flex-direction: column;
  height: 100vh;
}}
main {{
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex-grow:2;
}}
h1 {{font-size:large}}
#outer {{
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 40pt;
  min-height: 3em;
  padding: 1rem;
}}
input {{font-size:x-large}}
hr {{margin:0px}}
</style>
</head>
<body>
<main>
<h1>{}</h1>
<div id='outer'><math display='block' xmlns='http://www.w3.org/1998/Math/MathML'>{}</math></div>
{}
</main>
<div style="flex-grow:1">
</div>
</body>
</html>
"""

BUTTON = """
<form action="/rng/" method="get">
<input type="submit" value="Skúsiť znovu", name="real-rng"/>
</form>
"""

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()

        if "real-rng" not in self.path:
            print(self.headers, dict(self.headers), sep='\n\n')
            ip = self.headers["X-Real-IP"]
            port = self.headers["X-Real-Port"]
            r = random.Random(hash(ip + port))
            button = ''
        else:
            r = random.Random()
            button = BUTTON

        random_numbers = {
            "int": f"<mn>{(lambda x: r.randint(-x,x))(10**r.randint(1,6)):,}</mn>".replace(",", " "),
            "int2": f"<mn>{(lambda x: r.randint(-x,x))(10**r.randint(1,6)):,}</mn>".replace(",", " "),
            "real": f"<mn>{r.random() * 10:.{r.randint(1,4)}f}</mn>",
            "real2": f"<mn>{r.random() * 10:.{r.randint(1,4)}f}</mn>",
            "fraction": f"<mfrac><mn>{r.randint(-10,10)}</mn><mn>{r.randint(1,10)}</mn>",
            "fraction2": f"<mfrac><mn>{r.randint(-10,10)}</mn><mn>{r.randint(1,10)}</mn>",
            "real_real": f'<mn>{r.choice(["e", "&pi;", "&phi;", "<msqrt><mn>2</mn></msqrt>", "<msqrt><mn>4</mn></msqrt>"])}</mn>',
            "recursive": f'<mrow><mn>0.</mn><mover><mn>{r.choice([9,3,1234,7])}</mn><mo>&OverBar;</mo></mover></mrow>',
        }
        random_number = r.choice(list(random_numbers.values()))

        heading = "Generátor &quot;náhodných&quot; čísel";
        if (random.randint(40,49) == 42):
            heading = random.choice([
                "Koľko máš rokov?",
                "Aké je tvoje telefónne číslo?",
                "Aké je tvoje obľúbené číslo?",
                "Aká známka ti vychádza z matiky?",
                "Aká známka ti vychádza z fyziky?",
            ])
            if random.randint(1,100) == 8:
                heading = "Ako veľmi máš rád svoju učiteľku matiky?"
                random_number = '<mtext>&infin; / 10</mtext>';

        self.wfile.write(bytes(DATA.format(heading, random_number, button), "utf-8"))


if __name__ == "__main__":
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
