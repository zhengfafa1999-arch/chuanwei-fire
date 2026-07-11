import os

TEMPLATE = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{cn_name} - {en_name} - 川维消防设备有限公司</title>
    <meta name="description" content="川维消防{cn_name}产品">
    <link rel="icon" href="../../favicon.ico">
    <link rel="apple-touch-icon" href="../../apple-touch-icon.png">
    <style>
        * {{ box-sizing: border-box; margin: 0; padding: 0; }}
        body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Microsoft YaHei', sans-serif; color: #333; line-height: 1.6; background: #fff; }}
        img {{ max-width: 100%; display: block; }}
        a {{ text-decoration: none; color: inherit; }}
        .container {{ max-width: 1200px; margin: 0 auto; padding: 0 20px; }}
        :root {{ --primary: #1a5276; --primary-light: #2e86c1; --primary-dark: #0e2f44; --bg-light: #f8f9fa; --text-light: #666; --border: #e0e0e0; }}
        .header {{ position: fixed; top: 0; left: 0; width: 100%; z-index: 1000; background: #fff; box-shadow: 0 2px 20px rgba(0,0,0,0.08); }}
        .header-inner {{ display: flex; align-items: center; justify-content: space-between; padding: 8px 20px; max-width: 1200px; margin: 0 auto; }}
        .logo {{ display: flex; align-items: center; gap: 10px; }}
        .logo-img {{ height: 36px; border-radius: 6px; }}
        .logo-text h1 {{ font-size: 16px; color: var(--primary); }}
        .logo-text span {{ font-size: 10px; color: var(--text-light); }}
        .back-link {{ display: inline-flex; align-items: center; gap: 6px; color: var(--primary); font-size: 14px; padding: 6px 14px; border-radius: 6px; }}
        .back-link:hover {{ background: #e8f0fe; }}
        .detail {{ padding: 100px 0 60px; }}
        .detail-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }}
        .main-image {{ border-radius: 12px; overflow: hidden; border: 1px solid var(--border); cursor: pointer; background: #f5f7fa; }}
        .main-image img {{ width: 100%; max-height: 500px; object-fit: contain; }}
        .product-info h2 {{ font-size: 28px; color: var(--primary); margin-bottom: 6px; }}
        .product-info .en-name {{ font-size: 14px; color: var(--primary-light); margin-bottom: 16px; }}
        .product-info .desc {{ font-size: 14px; color: #555; line-height: 1.8; margin-bottom: 20px; }}
        .features {{ list-style: none; margin-bottom: 24px; }}
        .features li {{ display: flex; align-items: center; gap: 8px; font-size: 14px; color: #444; margin-bottom: 8px; }}
        .features li::before {{ content: "\\2713"; color: var(--primary-light); font-weight: 700; font-size: 16px; }}
        .inquiry-btn {{ display: inline-block; background: var(--primary); color: #fff; padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 600; transition: background 0.3s; }}
        .inquiry-btn:hover {{ background: var(--primary-dark); }}
        .gallery {{ margin-top: 40px; }}
        .gallery h3 {{ font-size: 20px; color: var(--primary); margin-bottom: 16px; }}
        .gallery-grid {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }}
        .gallery-item {{ border-radius: 8px; overflow: hidden; border: 1px solid var(--border); cursor: pointer; transition: all 0.3s; background: #f5f7fa; }}
        .gallery-item:hover {{ transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }}
        .gallery-item img {{ width: 100%; height: 180px; object-fit: contain; background: #f5f7fa; }}
        .related {{ margin-top: 50px; padding-top: 40px; border-top: 1px solid var(--border); }}
        .related h3 {{ font-size: 20px; color: var(--primary); margin-bottom: 16px; }}
        .related-grid {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }}
        .related-card {{ padding: 16px; border-radius: 10px; border: 1px solid var(--border); transition: all 0.3s; display: block; text-align: center; }}
        .related-card:hover {{ box-shadow: 0 8px 20px rgba(0,0,0,0.06); border-color: var(--primary-light); }}
        .related-card h4 {{ font-size: 14px; color: var(--primary); }}
        .modal {{ display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 9999; align-items: center; justify-content: center; }}
        .modal.open {{ display: flex; }}
        .modal img {{ max-width: 90%; max-height: 90%; }}
        .modal .close {{ position: absolute; top: 20px; right: 30px; color: #fff; font-size: 36px; cursor: pointer; }}
        .modal .nav-btn {{
            position: absolute; top: 50%; transform: translateY(-50%);
            background: rgba(255,255,255,0.12); color: #fff;
            border: none; font-size: 28px; padding: 14px 20px;
            cursor: pointer; border-radius: 50%; transition: all 0.3s;
            z-index: 10; line-height: 1;
        }}
        .modal .nav-btn:hover {{ background: rgba(255,255,255,0.3); }}
        .modal .nav-prev {{ left: 16px; }}
        .modal .nav-next {{ right: 16px; }}
        .footer {{ background: var(--primary-dark); color: rgba(255,255,255,0.65); padding: 30px 0 20px; text-align: center; font-size: 12px; }}
        @media (max-width: 768px) {{ .detail-grid {{ grid-template-columns: 1fr; }} .gallery-grid, .related-grid {{ grid-template-columns: repeat(2, 1fr); }} }}
    </style>
</head>
<body>
    <header class="header">
        <div class="header-inner">
            <a href="../../index.html" class="logo">
                <img class="logo-img" src="../../apple-touch-icon.png" alt="川维消防">
                <div class="logo-text"><h1>川维消防</h1><span>Chuanwei Fire</span></div>
            </a>
            <a href="../../index.html" class="back-link">&larr; 返回首页</a>
        </div>
    </header>
    <section class="detail">
        <div class="container">
            <div class="detail-grid">
                <div class="main-image" onclick="openModal(this.querySelector('img').src)">
                    <img loading="lazy" src="{main_img}" alt="{cn_name}">
                </div>
                <div class="product-info">
                    <h2>{cn_name}</h2>
                    <div class="en-name">{en_name}</div>
                    <p class="desc">{desc}</p>
                    <ul class="features">{features_html}</ul>
                    <a href="../../index.html" class="inquiry-btn">&#128233; 立即询价</a>
                </div>
            </div>
            <div class="gallery">
                <h3>系列产品展示</h3>
                <div class="gallery-grid">{gallery_html}</div>
            </div>
            <div class="related">
                <h3>相关产品</h3>
                <div class="related-grid">{related_html}</div>
            </div>
        </div>
    </section>
    <footer class="footer">
        <div class="container">
            <p>&copy; 2026 川维消防设备有限公司 | <a href="../../index.html">首页</a> | <a href="../../index.html#products">产品中心</a></p>
        </div>
    </footer>
    <div class="modal" id="imageModal">
        <span class="close">&times;</span>
        <button class="nav-btn nav-prev" onclick="changeImage(-1)">&#10094;</button>
        <img id="modalImage" src="" alt="">
        <button class="nav-btn nav-next" onclick="changeImage(1)">&#10095;</button>
    </div>
    <script>
        let galleryImages = [];
        let currentImageIndex = 0;

        function openModal(src) {{
            const imgs = document.querySelectorAll('.gallery-grid img');
            galleryImages = Array.from(imgs).map(img => img.src);
            const mainImg = document.querySelector('.main-image img');
            if (mainImg) {{
                const mainSrc = mainImg.src;
                const idx = galleryImages.indexOf(mainSrc);
                if (idx !== -1) galleryImages.splice(idx, 1);
                galleryImages.unshift(mainSrc);
            }}
            currentImageIndex = galleryImages.indexOf(src);
            if (currentImageIndex === -1) currentImageIndex = 0;
            showImage();
            document.getElementById('imageModal').classList.add('open');
        }}

        function changeImage(direction) {{
            currentImageIndex += direction;
            if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
            if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
            showImage();
        }}

        function showImage() {{
            document.getElementById('modalImage').src = galleryImages[currentImageIndex];
        }}

        document.getElementById('imageModal').addEventListener('click', function(e) {{
            if (e.target === this) this.classList.remove('open');
        }});
        document.querySelector('.modal .close').addEventListener('click', function() {{
            document.getElementById('imageModal').classList.remove('open');
        }});
        document.addEventListener('keydown', function(e) {{
            if (!document.getElementById('imageModal').classList.contains('open')) return;
            if (e.key === 'ArrowLeft') changeImage(-1);
            if (e.key === 'ArrowRight') changeImage(1);
            if (e.key === 'Escape') document.getElementById('imageModal').classList.remove('open');
        }});
    </script>
</body>
</html>"""

mapping = [
    ("室内消防栓", "室内消火栓", "Indoor Fire Hydrants",
     "川维消防室内消火栓系列包括SN65、SNW65-I-C、SNW65-II-Y等多种型号，严格按照国家标准设计制造，广泛应用于商业建筑、住宅小区、工业厂房等场所的消防给水系统。",
     ["全系列产品齐全", "铸造工艺精湛", "密封性能优良", "操作灵活轻便", "符合国家标准"]),
    ("室外消防栓", "室外消火栓", "Outdoor Fire Hydrants",
     "川维消防室外消火栓采用优质铸铁制造，表面防腐处理，适用于城市道路、工业园区、商业广场等室外场所，为消防救援提供可靠的水源保障。",
     ["优质铸铁坚固耐用", "表面防腐涂装", "出水口规格齐全", "密封性能好", "适用于各种室外场所"]),
]

for folder, cn, en, desc, feats in mapping:
    img_dir = f"products/{folder}"
    images = sorted([f for f in os.listdir(img_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
    if not images:
        continue

    main_img = next((f for f in images if '主图' in f), images[0])

    feat_html = ""
    for f in feats:
        feat_html += f'\n                            <li>{f}</li>'

    gal_html = ""
    for img in images:
        gal_html += f'\n                    <div class="gallery-item" onclick="openModal(this.querySelector(\'img\').src)"><img loading="lazy" src="{img}" alt="{cn}"></div>'

    rel_html = """
                    <a href="../../消防喷头.html" class="related-card"><h4>洒水喷头</h4></a>
                    <a href="../../消防阀.html" class="related-card"><h4>消防阀门与蝶阀</h4></a>
                    <a href="../../软管卷盘.html" class="related-card"><h4>消防软管卷盘</h4></a>
                    <a href="../../消防水泵接合器.html" class="related-card"><h4>消防水泵接合器</h4></a>"""

    html = TEMPLATE.format(cn_name=cn, en_name=en, main_img=main_img, desc=desc,
                          features_html=feat_html, gallery_html=gal_html, related_html=rel_html)

    filepath = f"products/{folder}/{folder}.html"
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"OK: {filepath}")

print("Done!")
