let svg, instrument, tipElement, culoare = 'hotpink', grosime = '1pt', dreptunghiuriDesenate, linie, dreptunghi, elipsa, culoareEdit, grosimeEdit, selectCuloareFundal,
    grosimeNoua, culoareNoua, element, elementSelectat = null, NESELECTAT = null, dx, dy, dx2, dy2;
let mx = 0, my = 0, x1 = 0, y1 = 0, cx = 0, cy = 0, xl = 0, yl = 0;

function salvareSVG() {
    let svgText = document.querySelector('svg').outerHTML;
    svgText = svgText.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"');
    var svgBlob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "desen.svg";
    downloadLink.click();
}

function mousedown(e) {
    if (instrument == 'deseneaza') {
        if (tipElement == 'linie') {
            linie.style.display = 'block';
            xl = mx;
            yl = my;
            setLinie(linie, xl, yl, mx, my);
        }
        if (tipElement == 'dreptunghi') {
            dreptunghi.style.display = 'block';
            x1 = mx;
            y1 = my;
            setDreptunghi(dreptunghi, x1, y1, mx, my);
        }
        if (tipElement == 'elipsa') {
            elipsa.style.display = 'block';
            cx = mx;
            cy = my;
            setElipsa(elipsa, cx, cy, mx, my);
        }
    }
    if (instrument == 'miscare') {
        if (elementSelectat) {
            btnMiscare.style.backgroundColor = '#00ff00';
            if (elementSelectat.tagName == 'line') {
                let x1 = elementSelectat.getAttribute('x1');
                dx = mx - x1;
                let y1 = elementSelectat.getAttribute('y1');
                dy = my - y1;
                let x2 = elementSelectat.getAttribute('x2');
                dx2 = mx - x2
                let y2 = elementSelectat.getAttribute('y2');
                dy2 = my - y2;
            }
            if (elementSelectat.tagName == 'rect') {
                let x = elementSelectat.getAttribute('x');
                dx = mx - x;
                let y = elementSelectat.getAttribute('y');
                dy = my - y;
            }
            if (elementSelectat.tagName == 'ellipse') {
                let cx = elementSelectat.getAttribute('cx');
                dx = mx - cx;
                let cy = elementSelectat.getAttribute('cy');
                dy = my - cy;
            }
        }
    }
    if (instrument == 'editeaza') {
        btnEditeaza.style.backgroundColor = '#00ff00';
    }
}

function mousemove(e) {
    mx = e.x - svg.getBoundingClientRect().x;
    my = e.y - svg.getBoundingClientRect().y;
    if (instrument == 'deseneaza') {
        if (tipElement == 'linie') {
            setLinie(linie, xl, yl, mx, my);
        }
        if (tipElement == 'dreptunghi') {
            setDreptunghi(dreptunghi, x1, y1, mx, my);
        }
        if (tipElement == 'elipsa') {
            setElipsa(elipsa, cx, cy, mx, my);
        }
    } 
    if (instrument == 'miscare') {
        if (elementSelectat) {
            if (elementSelectat.tagName = 'line') {
                elementSelectat.setAttribute('x1', mx - dx);
                elementSelectat.setAttribute('y1', my - dy);
                elementSelectat.setAttribute('x2', mx - dx2);
                elementSelectat.setAttribute('y2', my - dy2);
            }
            if (elementSelectat.tagName == 'rect') {
                elementSelectat.setAttribute('x', mx - dx);
                elementSelectat.setAttribute('y', my - dy);
            }
            if (elementSelectat.tagName = 'ellipse') {
                elementSelectat.setAttribute('cx', mx - dx);
                elementSelectat.setAttribute('cy', my - dy);
            }
        }
    }
}

function mouseup(e) {
    if (instrument == 'deseneaza') {
        if (tipElement == 'linie') {
            linie.style.display = 'none';
            let element = document.createElementNS("http://www.w3.org/2000/svg", 'line');
            setLinie(element, xl, yl, mx, my);

            element.style.stroke = culoare;
            element.style.fill = culoare;
            element.style.fillOpacity = 0.1;
            element.style.strokeWidth = grosime;

            element.addEventListener('mousedown', e => {
                elementSelectat = element;
            })

            liniiiDesenate.append(element);
        }
        if (tipElement == 'dreptunghi') {
            dreptunghi.style.display = 'none';
            let element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            setDreptunghi(element, x1, y1, mx, my);

            element.style.stroke = culoare;
            element.style.fill = culoare;
            element.style.fillOpacity = 0.1;
            element.style.strokeWidth = grosime;

            element.addEventListener('mousedown', e => {
                elementSelectat = element;
            })

            dreptunghiuriDesenate.append(element);
        }
        if (tipElement == 'elipsa') {
            elipsa.style.display = 'none';
            let element = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
            setElipsa(element, cx, cy, mx, my);

            element.style.stroke = culoare;
            element.style.fill = culoare;
            element.style.fillOpacity = 0.1;
            element.style.strokeWidth = grosime;

            element.addEventListener('mousedown', e => {
                elementSelectat = element;
            })

            elipseDesenate.append(element);
        }
    }
    if (instrument == 'miscare') {
        if (elementSelectat) {
            btnMiscare.style.backgroundColor = '#ffb6c1';
            elementSelectat = NESELECTAT;
        }
    }
    if (instrument == 'editeaza') {
        if (elementSelectat) {
            elementSelectat.style.stroke = culoareNoua;
            elementSelectat.style.strokeWidth = grosimeNoua;
            elementSelectat.style.fill = culoareFundal;

            btnEditeaza.style.backgroundColor = '#ffb6c1';
            elementSelectat = NESELECTAT;
            culoareEdit.style.display = 'none';
            grosimeEdit.style.display = 'none';
            selectCuloareFundal.style.display = 'none';
        }
    }
    if (instrument == 'sterge') {
        if (elementSelectat) {
            elementSelectat.remove();
            elementSelectat = NESELECTAT;
        }
    }
}

function setLinie(linie, x1, y1, x2, y2) {
    linie.setAttribute('x1', x1);
    linie.setAttribute('y1', y1);
    linie.setAttribute('x2', x2);
    linie.setAttribute('y2', y2);
}

function setDreptunghi(dreptunghi, x1, y1, x2, y2) {
    dreptunghi.setAttribute('x', Math.min(x1, x2));
    dreptunghi.setAttribute('y', Math.min(y1, y2));
    dreptunghi.setAttribute('width', Math.abs(mx - x1));
    dreptunghi.setAttribute('height', Math.abs(my - y1));
}

function setElipsa(elipsa, cx, cy, rx, ry) {
    elipsa.setAttribute('cx', cx);
    elipsa.setAttribute('cy', cy);
    elipsa.setAttribute('rx', Math.abs(rx - cx));
    elipsa.setAttribute('ry', Math.abs(ry - cy));
}

function aplicatie() {
    let btnDeseneaza = document.getElementById('btnDeseneaza');
    let btnCuloaresiGrosime = document.getElementById('btnCuloaresiGrosime');
    let btnEditeaza = document.getElementById('btnEditeaza');
    let btnSterge = document.getElementById('btnSterge');
    let btnSalveaza = document.querySelector('#btnSalvare');
    let btnMiscare = document.getElementById('btnMiscare');

    svg = document.querySelector("#editor");

    linie = document.querySelector('#linie');
    dreptunghi = document.querySelector('#dreptunghi');
    elipsa = document.querySelector('#elipsa');

    liniiiDesenate = document.querySelector('#liniiDesenate');
    dreptunghiuriDesenate = document.querySelector('#dreptunghiuriDesenate');
    elipseDesenate = document.querySelector('#elipseDesenate');

    svg.addEventListener('mousedown', mousedown);
    svg.addEventListener('mousemove', mousemove);
    svg.addEventListener('mouseup', mouseup);

    let selectDeseneaza = document.getElementById("deseneaza");
    selectDeseneaza.addEventListener('change', e => {
        let forma = document.getElementById('deseneaza').value;
        if (forma == 'Linie') {
            tipElement = 'linie';
        }
        if (forma == 'Dreptunghi') {
            tipElement = 'dreptunghi';
        }
        if (forma == 'Elipsa') {
            tipElement = 'elipsa';
        }
    });
 
    btnDeseneaza.addEventListener('click', e => {
        instrument = 'deseneaza';
        selectDeseneaza.style.display = 'flex';
        btnDeseneaza.style.backgroundColor = '#00ff00';

        btnCuloaresiGrosime.style.backgroundColor = '#ffb6c1';
        selectCuloare.style.display = 'none';
        selectGrosime.style.display = 'none';
        btnMiscare.style.backgroundColor = '#ffb6c1';
        btnEditeaza.style.backgroundColor = '#ffb6c1';
        culoareEdit.style.display = 'none';
        grosimeEdit.style.display = 'none';
        selectCuloareFundal.style.display = 'none';
        btnSterge.style.backgroundColor = '#ffb6c1';
    });

    let selectCuloare = document.querySelector('#culoare');
    let selectGrosime = document.querySelector('#grosime');
    btnCuloaresiGrosime.addEventListener('click', e => {
        btnCuloaresiGrosime.style.backgroundColor = '#00ff00';
        selectCuloare.style.display = 'flex';
        selectGrosime.style.display = 'flex';

        selectCuloare.addEventListener('change', e => {
            let culoareSelectata = selectCuloare.value;
            if (culoareSelectata == 'Rosu') {
                culoare = '#ff0000';
            } else if (culoareSelectata == 'Verde') {
                culoare = '#008000';
            } else if (culoareSelectata == 'Galben') {
                culoare = '#ffd700';
            } else if (culoareSelectata == 'Albastru') {
                culoare = '#0000ff';
            } else if (culoareSelectata == 'Roz') {
                culoare = '#ff69b4';
            } else if (culoareSelectata == 'Mov') {
                culoare = '#800080';
            }
        })

        selectGrosime.addEventListener('change', e => {
            let grosimeSelectata = selectGrosime.value;
            if (grosimeSelectata == '1pt') {
                grosime = '1pt';
            } else if (grosimeSelectata == '1.5pt') {
                grosime = '1.5pt';
            } else if (grosimeSelectata == '2pt') {
                grosime = '2pt';
            } else if (grosimeSelectata == '3pt') {
                grosime = '3pt';
            } else if (grosimeSelectata == '4pt') {
                grosime = '4pt';
            } else if (grosimeSelectata == '5pt') {
                grosime = '5pt';
            } else if (grosimeSelectata == '7pt') {
                grosime = '7pt';
            } else if (grosimeSelectata == '10pt') {
                grosime = '10pt';
            }
        })

        btnDeseneaza.style.backgroundColor = '#ffb6c1';
        selectDeseneaza.style.display = 'none';
        btnMiscare.style.backgroundColor = '#ffb6c1';
        btnEditeaza.style.backgroundColor = '#ffb6c1';
        culoareEdit.style.display = 'none';
        grosimeEdit.style.display = 'none';
        selectCuloareFundal.style.display = 'none';
        btnSterge.style.backgroundColor = '#ffb6c1';
    })

    btnMiscare.addEventListener('click', e => {
        instrument = 'miscare';
        btnMiscare.style.backgroundColor = '#00ff00';

        btnDeseneaza.style.backgroundColor = '#ffb6c1';
        selectDeseneaza.style.display = 'none';

        btnCuloaresiGrosime.style.backgroundColor = '#ffb6c1';
        selectCuloare.style.display = 'none';
        selectGrosime.style.display = 'none';
        btnEditeaza.style.backgroundColor = '#ffb6c1';
        culoareEdit.style.display = 'none';
        grosimeEdit.style.display = 'none';
        selectCuloareFundal.style.display = 'none';
        btnSterge.style.backgroundColor = '#ffb6c1';
    });

    btnEditeaza.addEventListener('click', e => {
        instrument = 'editeaza';
        btnEditeaza.style.backgroundColor = '#00ff00';
        culoareEdit.style.display = 'flex';
        grosimeEdit.style.display = 'flex';
        selectCuloareFundal.style.display = 'flex';

        btnDeseneaza.style.backgroundColor = '#ffb6c1';
        selectDeseneaza.style.display = 'none';
        btnCuloaresiGrosime.style.backgroundColor = '#ffb6c1';
        selectCuloare.style.display = 'none';
        selectGrosime.style.display = 'none';
        btnMiscare.style.backgroundColor = '#ffb6c1';
        btnSterge.style.backgroundColor = '#ffb6c1';
    })

    btnSterge.addEventListener('click', e => {
        instrument = 'sterge';
        btnSterge.style.backgroundColor = '#00ff00';

        btnDeseneaza.style.backgroundColor = '#ffb6c1';
        selectDeseneaza.style.display = 'none';
        btnCuloaresiGrosime.style.backgroundColor = '#ffb6c1';
        selectCuloare.style.display = 'none';
        selectGrosime.style.display = 'none';
        btnMiscare.style.backgroundColor = '#ffb6c1';
        btnEditeaza.style.backgroundColor = '#ffb6c1';
        culoareEdit.style.display = 'none';
        grosimeEdit.style.display = 'none';
        selectCuloareFundal.style.display = 'none';
    })
    btnSalveaza.addEventListener('click', salvareSVG);

    culoareEdit = document.querySelector('#editCuloare');
    grosimeEdit = document.querySelector('#editGrosime');
    selectCuloareFundal = document.querySelector('#editFundal');

    culoareEdit.addEventListener('change', e => {

        let selectieCuloare = culoareEdit.value;
        if (selectieCuloare == 'Rosu') {
            culoareNoua = '#ff0000';
        } else if (selectieCuloare == 'Verde') {
            culoareNoua = '#008000';
        } else if (selectieCuloare == 'Galben') {
            culoareNoua = '#ffd700';
        } else if (selectieCuloare == 'Albastru') {
            culoareNoua = '#0000ff';
        } else if (selectieCuloare == 'Roz') {
            culoareNoua = '#ff69b4';
        } else if (selectieCuloare == 'Mov') {
            culoareNoua = '#800080';
        }
    })

    grosimeEdit.addEventListener('change', e => {
        let selectieGrosime = grosimeEdit.value;
        if (selectieGrosime == '1pt') {
            grosimeNoua = '1pt';
        } else if (selectieGrosime == '1.5pt') {
            grosimeNoua = '1.5pt';
        } else if (selectieGrosime == '2pt') {
            grosimeNoua = '2pt';
        } else if (selectieGrosime == '3pt') {
            grosimeNoua = '3pt';
        } else if (selectieGrosime == '4pt') {
            grosimeNoua = '4pt';
        } else if (selectieGrosime == '5pt') {
            grosimeNoua = '5pt';
        } else if (selectieGrosime == '7pt') {
            grosimeNoua = '7pt';
        } else if (selectieGrosime == '10pt') {
            grosimeNoua = '10pt';
        }
    })

    selectCuloareFundal.addEventListener('change', e => {

        let selectieCuloareFundal = selectCuloareFundal.value;
        if (selectieCuloareFundal == 'Rosu') {
            culoareFundal = '#ff0000';
        } else if (selectieCuloareFundal == 'Verde') {
            culoareFundal = '#008000';
        } else if (selectieCuloareFundal == 'Galben') {
            culoareFundal = '#ffd700';
        } else if (selectieCuloareFundal == 'Albastru') {
            culoareFundal = '#0000ff';
        } else if (selectieCuloareFundal == 'Roz') {
            culoareFundal = '#ff69b4';
        } else if (selectieCuloareFundal == 'Mov') {
            culoareFundal = '#800080';
        }
    })
}

document.addEventListener('DOMContentLoaded', aplicatie);
