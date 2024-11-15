document.addEventListener("DOMContentLoaded", e => {
    let t = window.innerWidth;
    if (document.querySelector('.inputNb[name="electromenager"]')) {
        if ("1" == document.querySelector('.inputNb[name="electromenager"]').value) {
            let e = document.querySelector('.inputNb[name="electromenager"]').value
              , t = document.querySelector('.inputNb[name="multimedia"]').value
              , n = document.querySelector('.inputNb[name="imageetson"]').value;
            e >= 0 && t >= 0 && n >= 0 && window.innerWidth >= 768 && updateFormule(e, t, n)
        }
    }
    if (document.querySelector('.inputNbMobile[name="electromenager"]')) {
        "1" == document.querySelector('.inputNbMobile[name="electromenager"]').value && nbElectromenager >= 0 && nbMultimedia >= 0 && nbImageEtSon >= 0 && window.innerWidth < 768 && updateFormuleMobile()
    }
    document.querySelectorAll(".inputNb").forEach(e => {
        e.addEventListener("change", function() {
            let e = document.querySelector('.inputNb[name="electromenager"]').value
              , t = document.querySelector('.inputNb[name="multimedia"]').value
              , n = document.querySelector('.inputNb[name="imageetson"]').value;
            e >= 0 && t >= 0 && n >= 0 && updateFormule(e, t, n)
        }),
        e.addEventListener("keyup", function(e) {
            let t = document.querySelector('.inputNb[name="electromenager"]').value
              , n = document.querySelector('.inputNb[name="multimedia"]').value
              , r = document.querySelector('.inputNb[name="imageetson"]').value;
            t >= 0 && n >= 0 && r >= 0 && updateFormule(t, n, r)
        })
    }
    ),
    document.querySelectorAll(".inputNbMobile").forEach(e => {
        e.addEventListener("keypress", function(e) {
            isNaN(e.key) && e.preventDefault()
        })
    }
    ),
    document.querySelectorAll(".inputNbMobile").forEach(e => {
        e.addEventListener("keyup", () => {
            updateFormuleMobile()
        }
        )
    }
    ),
    window.addEventListener("resize", e => {
        e.target.innerWidth < 768 && t >= 768 && (document.querySelectorAll(".inputNb").forEach(e => {
            e.value = 0
        }
        ),
        updateFormule(0, 0, 0),
        document.querySelector(".container").appendChild(document.getElementById("btnAdhesion"))),
        e.target.innerWidth > 768 && t <= 768 && (document.querySelectorAll(".masque").forEach(e => e.classList.add("hidden")),
        document.querySelector(".inputNbMobile").value = "",
        document.querySelector('input[name="electromenagerMobile"]').value = 0,
        document.querySelector('input[name="multimediaMobile"]').value = 0,
        document.querySelector('input[name="imageetsonMobile"]').value = 0,
        document.querySelectorAll(".universChoice").forEach(e => {
            e.classList.add("h-[90%]"),
            e.classList.remove("h-full")
        }
        )),
        t = e.target.innerWidth
    }
    ),
    document.querySelectorAll(".clickButton").forEach(e => {
        e.addEventListener("click", e => {
            let t = e.target.getAttribute("data-categorie")
              , n = window.innerWidth < 768 ? document.querySelector('.inputNbMobile[name="' + t + 'Mobile"]') : document.querySelector('.inputNb[name="' + t + '"]');
            if ("less" == e.target.getAttribute("data-action") && (n.value > 0 ? n.value = Number(n.value) - 1 : n.value = 0),
            "more" == e.target.getAttribute("data-action") && (n.value = Number(n.value) + 1),
            window.innerWidth < 768)
                updateFormuleMobile();
            else {
                let e = document.querySelector('.inputNb[name="electromenager"]').value
                  , t = document.querySelector('.inputNb[name="multimedia"]').value
                  , n = document.querySelector('.inputNb[name="imageetson"]').value;
                e >= 0 && t >= 0 && n >= 0 && updateFormule(e, t, n)
            }
        }
        )
    }
    )
}
);
let carousel = document.querySelector(".divResult")
  , indicator = document.querySelector("#dots")
  , elements = [...document.querySelectorAll(".divResult > div > div")]
  , currentIndexOffres = 0;
function renderIndicator() {
    indicator.innerHTML = "";
    for (let e = 0; e < elements.length; e++) {
        let t = document.createElement("span");
        e === currentIndexOffres ? t.classList.add("active") : t.classList.remove("active"),
        function(e) {
            t.onclick = function() {
                elements[e].scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center"
                })
            }
        }(e),
        indicator.appendChild(t)
    }
    1 == elements.length && (indicator.style.display = "none")
}
let elementIndices = {}
  , observer = new IntersectionObserver(function(e, t) {
    let n = e.reduce(function(e, t) {
        return t.intersectionRatio > e.intersectionRatio ? t : e
    });
    n.isIntersecting > 0 && (currentIndexOffres = elementIndices[n.target.getAttribute("id")],
    renderIndicator())
}
,{
    root: carousel,
    threshold: 1
});
for (let e = 0; e < elements.length; e++)
    elementIndices[elements[e].getAttribute("id")] = e,
    observer.observe(elements[e]);
function updateFormule(e, t, n) {
    let r = []
      , o = 0
      , i = Number(e) + Number(t) + Number(n) || 0;
    e > 0 && (r.push("electromenager"),
    o++),
    t > 0 && (r.push("multimedia"),
    o++),
    n > 0 && (r.push("imageetson"),
    o++),
    document.getElementById("btnAdhesion") && document.getElementById("btnAdhesion").setAttribute("data-nb", o);
    for (let e = 1; e <= 3; e++)
        document.querySelectorAll(".noChoice" + e).forEach(e => e.classList.remove("hidden")),
        document.querySelectorAll(".choice" + e).forEach(e => e.classList.add("hidden")),
        document.querySelector('.universChoice[data-choice="' + e + '"]').classList.remove("active"),
        document.getElementById("universChoice" + e).classList.remove("active");
    if (r.forEach(e => {
        document.querySelector(".noChoice" + o + '[data-category="' + e + '"]').classList.add("hidden"),
        document.querySelector(".choice" + o + '[data-category="' + e + '"]').classList.remove("hidden")
    }
    ),
    document.getElementById("nbTotalAppareils").innerText = i,
    document.getElementById("pricePerProduct1").innerText = "X.XX",
    document.getElementById("pricePerProduct2").innerText = "X.XX",
    document.getElementById("pricePerProduct3").innerText = "X.XX",
    document.getElementById("pricePerProduct1Mobile").innerText = "X.XX",
    document.getElementById("pricePerProduct2Mobile").innerText = "X.XX",
    document.getElementById("pricePerProduct3Mobile").innerText = "X.XX",
    r.length > 0) {
        r.length;
        document.getElementById("pricePerProduct1").innerText = (9.99 / i).toFixed(2),
        document.getElementById("pricePerProduct2").innerText = (14.99 / i).toFixed(2),
        document.getElementById("pricePerProduct3").innerText = (19.99 / i).toFixed(2),
        document.querySelector(".divTotal").classList.add("md:flex"),
        document.querySelectorAll(".universChoiceBottom").forEach(e => e.classList.add("md:invisible")),
        document.getElementById("universChoice" + r.length).classList.remove("md:invisible"),
        document.querySelector('.universChoice[data-choice="' + r.length + '"]').classList.add("active"),
        document.getElementById("universChoice" + r.length).classList.add("active"),
        document.querySelectorAll('.masque[data-choice="' + r.length + '"]').forEach(e => e.classList.remove("md:block")),
        r.length,
        document.querySelector(".custom-grid").classList.add("full");
        let e = document.getElementById("universChoice" + r.length)
          , t = document.getElementById("btnAdhesion");
        e.appendChild(t)
    } else
        document.querySelector(".divTotal").classList.remove("md:flex"),
        document.querySelector(".divImageSon").classList.add("md:rounded-bl-lg"),
        document.querySelector(".divImageSon").classList.add("md:border-b"),
        document.querySelectorAll(".masque").forEach(e => {
            e.classList.remove("md:block")
        }
        ),
        document.querySelector(".custom-grid").classList.remove("full")
}
function updateFormuleMobile() {
    let e = 0
      , t = (document.querySelector('input[name="electromenagerMobile"]').value,
    document.querySelector('input[name="multimediaMobile"]').value,
    document.querySelector('input[name="imageetsonMobile"]').value,
    0);
    if (document.querySelectorAll(".inputNbMobile").forEach(n => {
        n.value > 0 && (t++,
        e += Number(n.value))
    }
    ),
    document.getElementById("btnAdhesion") && document.getElementById("btnAdhesion").setAttribute("data-nb", t),
    t > 0) {
        document.querySelectorAll(".universChoice").forEach(e => {
            e.classList.add("h-[90%]"),
            e.classList.remove("h-full")
        }
        ),
        document.getElementById("pricePerProduct1Mobile").innerText = (9.99 / e).toFixed(2),
        document.getElementById("pricePerProduct2Mobile").innerText = (14.99 / e).toFixed(2),
        document.getElementById("pricePerProduct3Mobile").innerText = (19.99 / e).toFixed(2);
        let n = document.querySelector('.universChoice[data-choice="' + t + '"]');
        n.classList.remove("h-[90%]"),
        n.classList.add("h-full"),
        n.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        }),
        document.querySelectorAll('.masque:not([data-choice="' + t + '"])').forEach(e => {
            e.classList.remove("hidden")
        }
        ),
        document.querySelectorAll('.masque[data-choice="' + t + '"]').forEach(e => {
            e.classList.add("hidden")
        }
        )
    } else {
        document.querySelectorAll(".masque").forEach(e => {
            e.classList.add("hidden")
        }
        );
        for (let e = 1; e < 4; e++)
            document.querySelector('.universChoice[data-choice="' + e + '"]').classList.remove("h-full"),
            document.querySelector('.universChoice[data-choice="' + e + '"]').classList.add("h-[90%]");
        document.querySelector('.universChoice[data-choice="' + t + '"]'),
        document.getElementById("pricePerProduct1Mobile").innerText = "X.XX",
        document.getElementById("pricePerProduct2Mobile").innerText = "X.XX",
        document.getElementById("pricePerProduct3Mobile").innerText = "X.XX"
    }
}
document.getElementById("btnAdhesion") && document.getElementById("btnAdhesion").addEventListener("click", e => {
    e.preventDefault();
    let t = e.target.getAttribute("href");
    switch (e.target.getAttribute("data-nb")) {
    case "1":
        window.parent.postMessage("pa-click-trk|simulateur-cofidis::1-univers::adherer", "*");
        break;
    case "2":
        window.parent.postMessage("pa-click-trk|simulateur-cofidis::2-univers::adherer", "*");
        break;
    case "3":
        window.parent.postMessage("pa-click-trk|simulateur-cofidis::3-univers::adherer", "*");
        break;
    default:
        window.parent.postMessage("pa-click-trk|simulateur-cofidis::1-univers::adherer", "*")
    }
    window.open(t, "_blank")
}
),
document.querySelector(".produitsEligibles") && document.querySelectorAll(".produitsEligibles").forEach(e => {
    e.addEventListener("click", e => {
        let t = e.target.getAttribute("href");
        switch (e.target.getAttribute("data-univ")) {
        case "electromenager":
            window.parent.postMessage("pa-click-trk|simulateur-cofidis::electromenager::produits-eligibles", "*");
            break;
        case "multimedia":
            window.parent.postMessage("pa-click-trk|simulateur-cofidis::multimedia::produits-eligibles", "*");
            break;
        case "image-son":
            window.parent.postMessage("pa-click-trk|simulateur-cofidis::image-son::produits-eligibles", "*");
            break;
        default:
            window.parent.postMessage("pa-click-trk|simulateur-cofidis::electromenager::produits-eligibles", "*")
        }
        window.open(t, "_blank")
    }
    )
}
);
