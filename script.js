setTimeout(() => {
  const title = document.querySelector(".title");
  const leaf = document.querySelector(".title .leaf");

  if (!title || !leaf) {
    console.warn("Canadian Kid title or leaf was not found.");
    return;
  }

  /*
    1. Permanent Encircled Red leaf
  */
  leaf.innerHTML = "";

  const leafImage = document.createElement("img");

  leafImage.src =
    "https://assets.codepen.io/15511238/6FDDE350-F29A-4161-AB3A-140B9087565B.png";

  leafImage.alt = "";
  leafImage.setAttribute("aria-hidden", "true");

  leaf.style.cssText =
    "display:inline-flex;" +
    "align-items:center;" +
    "justify-content:center;" +
    "width:2.05em;" +
    "height:2.05em;" +
    "margin-left:-9px;" +
    "margin-right:-8px;" +
    "transform:translateY(.74em);" +
    "vertical-align:baseline;" +
    "overflow:visible;";

  leaf.style.setProperty("filter", "none", "important");

  leafImage.style.cssText =
    "display:block;" +
    "width:100%;" +
    "height:100%;" +
    "object-fit:contain;";

  leafImage.style.setProperty("filter", "none", "important");

  leaf.appendChild(leafImage);

  /*
    2. Create the custom KiD lettering
  */
  function buildKidWord() {
    const kid = document.createElement("span");
    kid.className = "ck-custom-kid";
    kid.setAttribute("aria-label", "KiD");

    const k = document.createElement("span");
    k.textContent = "K";

    const i = document.createElement("span");
    const iDot = document.createElement("span");
    const iStem = document.createElement("span");

    const d = document.createElement("span");
    d.textContent = "D";

    kid.appendChild(k);
    kid.appendChild(i);
    kid.appendChild(d);

    const markerFont =
      '"Marker Felt", "Chalkboard SE", "Comic Sans MS", cursive';

    kid.style.cssText =
      "display:inline-flex;" +
      "align-items:center;" +
      "gap:.025em;" +
      "margin-left:.10em;" +
      "font-size:1.03em;" +
      "line-height:1;" +
      "vertical-align:baseline;" +
      "white-space:nowrap;" +
      "overflow:visible;";

    [k, d].forEach(letter => {
      letter.style.fontFamily = markerFont;
      letter.style.fontWeight = "700";
      letter.style.color = "inherit";
      letter.style.webkitTextFillColor = "currentColor";
      letter.style.textShadow = "0 1px 1px rgba(0,0,0,.20)";
      letter.style.transformOrigin = "center bottom";
      letter.style.display = "inline-block";
    });

    k.style.fontSize = "1.10em";
    k.style.transform =
      "rotate(-4deg) translateY(-.015em)";

    d.style.fontSize = "1.05em";
    d.style.transform =
      "rotate(6deg) translateY(.03em)";

    /*
      Straight lowercase i with no hook
    */
    i.style.cssText =
      "position:relative;" +
      "display:inline-block;" +
      "width:.28em;" +
      "height:.96em;" +
      "transform:rotate(1deg) translateY(.035em);" +
      "transform-origin:center bottom;";
    i.style.marginLeft = "-0.03em";

    iStem.style.cssText =
      "position:absolute;" +
      "left:50%;" +
      "bottom:0;" +
      "width:.13em;" +
      "height:.58em;" +
      "transform:translateX(-50%);" +
      "border-radius:.07em;" +
      "background:currentColor;" +
      "box-shadow:0 1px 1px rgba(0,0,0,.20);";

    iDot.style.cssText =
      "position:absolute;" +
      "left:53%;" +
      "top:.035em;" +
      "width:.17em;" +
      "height:.17em;" +
      "transform:translateX(-50%);" +
      "border-radius:50%;" +
      "background:currentColor;" +
      "box-shadow:0 1px 1px rgba(0,0,0,.20);";

    i.appendChild(iDot);
    i.appendChild(iStem);

    return kid;
  }

  /*
    3. Find only the existing KID text and replace it.
       Everything else in the original title remains intact.
  */
  const walker = document.createTreeWalker(
    title,
    NodeFilter.SHOW_TEXT
  );

  const textNodes = [];
  let currentNode;

  while ((currentNode = walker.nextNode())) {
    if (/KID/i.test(currentNode.nodeValue)) {
      textNodes.push(currentNode);
    }
  }

  if (!textNodes.length) {
    console.warn("The KID text was not found in the title.");
    return;
  }

  const targetNode = textNodes[0];
  const originalText = targetNode.nodeValue;
  const match = originalText.match(/KID/i);

  const before = originalText.slice(0, match.index);
  const after = originalText.slice(
    match.index + match[0].length
  );

  const fragment = document.createDocumentFragment();

  if (before) {
    fragment.appendChild(document.createTextNode(before));
  }

  fragment.appendChild(buildKidWord());

  if (after) {
    fragment.appendChild(document.createTextNode(after));
  }

  targetNode.parentNode.replaceChild(fragment, targetNode);
}, 300);