"""Generate the public standard-response sprinkler sheet from its page data."""
import argparse
import json
from pathlib import Path
from xml.sax.saxutils import escape
from urllib.parse import quote
from pypdf import PdfReader

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Image, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--date')
parser.add_argument('--output', default='assets/downloads/standard-response-fire-sprinklers-en.pdf')
args = parser.parse_args()
data = json.loads((ROOT / 'site-src/_data/documented-products/standard-response-fire-sprinkler.json').read_text(encoding='utf-8'))
args.date = args.date or data['downloads'][0].get('version', '2026-10-08')
copy, values = data['copy']['en'], data['shared']
font = 'Helvetica'
bold = 'Helvetica-Bold'
if Path('C:/Windows/Fonts/arial.ttf').exists():
    pdfmetrics.registerFont(TTFont('SheetArial', 'C:/Windows/Fonts/arial.ttf'))
    pdfmetrics.registerFont(TTFont('SheetArialBold', 'C:/Windows/Fonts/arialbd.ttf'))
    font, bold = 'SheetArial', 'SheetArialBold'
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='SheetBody', fontName=font, fontSize=9, leading=12, textColor=colors.HexColor('#183446')))
styles.add(ParagraphStyle(name='SheetSmall', fontName=font, fontSize=8, leading=11, textColor=colors.HexColor('#425866')))
styles.add(ParagraphStyle(name='SheetHeading', fontName=bold, fontSize=12, leading=16, spaceBefore=10, spaceAfter=6, textColor=colors.HexColor('#17394f')))
styles.add(ParagraphStyle(name='SheetTitle', fontName=bold, fontSize=21, leading=25, spaceAfter=5, textColor=colors.HexColor('#17394f')))
def p(text, style='SheetBody'):
    return Paragraph(escape(str(text)), styles[style])
def grid(rows, widths):
    table = Table([[p(cell) for cell in row] for row in rows], colWidths=widths, hAlign='LEFT', repeatRows=1)
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#eaf0f4')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LINEBELOW', (0, 0), (-1, -1), 0.4, colors.HexColor('#d4dfe6')),
        ('LEFTPADDING', (0, 0), (-1, -1), 8), ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 4), ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    return table
output = ROOT / args.output
output.parent.mkdir(parents=True, exist_ok=True)
width = A4[0] - 88
story = [p(copy['title'], 'SheetTitle'), p(f'Product data sheet | English | Updated {args.date}', 'SheetSmall'), Spacer(1, 10)]
hero = Image(str(ROOT / data['media']['hero']), width=100, height=100)
summary = [p(copy['lead']), Spacer(1, 9), p('Three installation options: upright, pendent and horizontal sidewall.'), Spacer(1, 9), p('Actual product photographs. Finish and ordered configuration are confirmed with the quotation.', 'SheetSmall')]
intro = Table([[hero, summary]], colWidths=[120, width-120])
intro.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),0)]))
story.append(intro)
story.append(p('Technical specifications', 'SheetHeading'))
specs = [['Selection field', 'Available scope']]
for label, key in [('Nominal connection','connectionValue'),('K-factor','kFactorValue'),('Pictured models','temperatureValue'),('Temperature options','temperatureOptionsValue'),('Maximum working pressure','workingPressureValue'),('Thermal element (pictured)','thermalElementValue')]:
    specs.append([label, values[key]])
for label, key in [('Threads','threadFormValue'),('Frame material','materialValue'),('Surface finish','finishValue')]:
    specs.append([label, copy[key]])
specs.append(['Pieces per box', values['piecesPerBoxValue']])
story.append(grid(specs,[160,width-160]))
story.append(p('Available factory models', 'SheetHeading'))
models = [['Orientation','Factory reference','K-factor']]
for model in data['models']:
    models.append([copy[model['orientation']],model['factoryModel'],model['kFactor']])
story.append(grid(models,[125,210,width-335]))
story.append(p('Quotation and packing', 'SheetHeading'))
story.append(p(copy['packagingBody']))
story.append(Spacer(1,6))
story.append(p('The model table identifies the supply configuration. It does not establish product approval or certification coverage.', 'SheetSmall'))
story.append(Spacer(1,10))
story.append(p('WhatsApp: +86 173 2652 8368 | Email: zhengcolin1@gmail.com'))
product_url = 'https://chuanweifire.com/products/' + quote('消防喷头') + '/standard-response-fire-sprinkler.html'
story.append(Paragraph(f'<a href="{product_url}" color="#17394f">View product details at chuanweifire.com</a>', styles['SheetSmall']))

def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont(bold,10)
    canvas.setFillColor(colors.HexColor('#17394f'))
    canvas.drawString(44,A4[1]-32,'CHUANWEI FIRE')
    canvas.setStrokeColor(colors.HexColor('#bf2436'))
    canvas.line(44,A4[1]-39,A4[0]-44,A4[1]-39)
    canvas.setFont(font,8)
    canvas.drawString(44,27,'Fire protection equipment manufacturing and supply | chuanweifire.com')
    canvas.drawRightString(A4[0]-44,27,str(doc.page))
    canvas.restoreState()

doc = SimpleDocTemplate(str(output),pagesize=A4,rightMargin=44,leftMargin=44,topMargin=52,bottomMargin=43,title=copy['title']+' - CHUANWEI FIRE',author='CHUANWEI FIRE')
doc.build(story,onFirstPage=footer,onLaterPages=footer)
sheet = PdfReader(output)
assert len(sheet.pages) == 1, 'The compact data sheet must fit on one A4 page'
extracted = ' '.join(sheet.pages[0].extract_text().split())
for key in ('connectionValue', 'kFactorValue', 'temperatureOptionsValue', 'workingPressureValue', 'piecesPerBoxValue'):
    assert ' '.join(values[key].split()) in extracted, f'Data sheet is missing shared field: {key}'
for key in ('threadFormValue', 'materialValue', 'finishValue', 'packagingBody'):
    assert ' '.join(copy[key].split()) in extracted, f'Data sheet differs from page copy: {key}'
for model in data['models']:
    assert model['factoryModel'] in extracted, 'Data sheet is missing a factory model'
print(f'Generated {output} ({output.stat().st_size} bytes)')
