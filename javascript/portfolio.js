
// Fill in the different "buckets" that you have pieces in; no need to alter
const bucket_ids = ['paintings', 'drawings', 'miscellaneous', 'sketchbook']

// Put all image links here
const all_images = [
    // paintings
    [
        'graphics/portfolio/possession1.jpeg',
        'graphics/portfolio/alebrije_study_1.JPG'
    ],
    // drawings
    [],
    // misc
    [],
    // sketchbook
    [
        'graphics/portfolio/portrait_old.JPG',
        'graphics/portfolio/portrait_close_1.JPG',
        'graphics/portfolio/portrait_close_2.JPG',
        'graphics/portfolio/cube.tiff',
        'graphics/portfolio/egg.JPG',
        'graphics/portfolio/book.JPG'
    ],
];

// Put title of each piece, respective to the order of the images
const all_titles = [
    // paintings
    [
    "Possession #1",
    "Alebrije Study"
    ],
    // drawings
    [],
    // misc
    [],
    // sketchbook
    [
        'Portrait of Friends',
        'Portrait of Friends, Detail 1',
        'Portrait of Friends, Detail 2',
        'Cube',
        'Egg',
        'Book'
    ],
];

// Put the associated text for each piece, respective to the order of the images
const all_texts = [
    // paintings
    [
    '"Possession #1"\nOil Paint on 16inx20in Canvas\n2026',
    '"Alebrije Study"\nOil Paint on 6inx4in Canvas\n2026'
    ],
    // drawings
    [],
    // misc
    [],
    // sketchbook
    [
        '"Portrait of Friends"\nOil Paint on 3ftx8ft Canvas\n2017',
        'Detail from "Portrait of Friends"\nOil Paint on Canvas\n2017',
        'Detail from "Portrait of Friends"\nOil Paint on Canvas\n2017',
        '"Cube"\nOil Paint on Canvas\n2017',
        '"Egg"\nOil Paint on Canvas\n2017',
        '"Book"\nOil Paint on Canvas\n2017'
    ],
];

const PortfolioManager = {

    activeBucket: -1,
    activePiece: -1,

    get_current_bucket_and_picture() {
        return [this.activeBucket, this.activePiece];
    },

    get_current_bucket() {
        return this.activeBucket;
    },

    get_current_picture() {
        return this.activePiece;
    },

    close_this_picture() {
        const [i, j] = this.get_current_bucket_and_picture();

        const this_popup = document.getElementById(`popup${i}${j}`);
        const this_popupOverlay = document.getElementById(`popupOverlay${i}${j}`);

        this_popup.style.display = 'none';
        this_popupOverlay.style.display = 'none';
    },

    show_previous_picture() {
        
        const [i_0, j_0] = this.get_current_bucket_and_picture();
        const [i_1, j_1] = this.get_previous_picture();

        const current_popup = document.getElementById(`popup${i_0}${j_0}`);
        const current_popupOverlay = document.getElementById(`popupOverlay${i_0}${j_0}`);

        current_popup.style.display = 'none';
        current_popupOverlay.style.display = 'none';

        const previous_popup = document.getElementById(`popup${i_1}${j_1}`);
        const previous_popupOverlay = document.getElementById(`popupOverlay${i_1}${j_1}`);

        previous_popup.style.display = 'block';
        previous_popupOverlay.style.display = 'block';

        this.activeBucket = i_1;
        this.activePiece = j_1;
    },

    show_next_picture() {

        const [i_0, j_0] = this.get_current_bucket_and_picture();
        const [i_1, j_1] = this.get_next_picture();

        const current_popup = document.getElementById(`popup${i_0}${j_0}`);
        const current_popupOverlay = document.getElementById(`popupOverlay${i_0}${j_0}`);

        current_popup.style.display = 'none';
        current_popupOverlay.style.display = 'none';

        const next_popup = document.getElementById(`popup${i_1}${j_1}`);
        const next_popupOverlay = document.getElementById(`popupOverlay${i_1}${j_1}`);

        next_popup.style.display = 'block';
        next_popupOverlay.style.display = 'block';

        this.activeBucket = i_1;
        this.activePiece = j_1;
    },

    pieces_in_current_bucket() {
        return all_images[this.get_current_bucket()].length
    },

    pieces_in_previous_bucket() {
        return all_images[this.get_current_bucket() - 1].length
    },

    pieces_in_next_bucket() {
        return all_images[this.get_current_bucket() + 1].length
    },

    last_bucket_index() {
        return bucket_ids.length - 1;
    },

    last_piece_index_in_last_bucket() {
        return all_images[bucket_ids.length - 1].length - 1;
    },

    is_first() {
        const [i, j] = this.get_current_bucket_and_picture();
        if (i === 0 && j === 0) {
            return true
        } else {
            return false
        }
    },

    is_last() {
        const [i, j] = this.get_current_bucket_and_picture();

        if (i === this.last_bucket_index() && j === this.last_piece_index_in_last_bucket()) {
            return true
        } else {
            return false
        }
    },

    get_previous_picture() {
        // this should not get called if it is the first picture
        let [i, j] = this.get_current_bucket_and_picture();

        if (j === 0) {
            i--;

            let pieces_in_previous_bucket = this.pieces_in_previous_bucket();
            while (pieces_in_previous_bucket === 0) {
                i--;
                this.activeBucket--;
                
                pieces_in_previous_bucket = this.pieces_in_previous_bucket();
            }
            j = this.pieces_in_previous_bucket() - 1;
        } else {
            j--;
        }

        return [i, j]
    },

    get_next_picture() {
        // this should not get called if it is the last picture
        let [i, j] = this.get_current_bucket_and_picture();
        
        if (j === this.pieces_in_current_bucket() - 1) {
            i++;
            
            let pieces_in_next_bucket = this.pieces_in_next_bucket();
            while (pieces_in_next_bucket === 0) {
                i++;
                this.activeBucket++;

                pieces_in_next_bucket = this.pieces_in_next_bucket();
            };
            j = 0;
        } else {
            j++;
        }
        return [i, j]
    },

    load_popup_elements() {
        // for each bucket
        for (const [i, id] of bucket_ids.entries()) {
            // if it has images
            if (all_images[i].length == 0) {
                continue;
            }

            images = all_images[i]
            titles = all_titles[i]
            texts = all_texts[i]

            const start = 0;
            const end = images.length;

            
            
            // for each image
            for (let j = start; j < end; j++) {
                // Instantiate all popup components
                const popupOverlay = document.createElement("div");
                popupOverlay.id = `popupOverlay${i}${j}`;
                popupOverlay.classList = "popup-overlay";
                const popup = document.createElement("div");
                popup.id = `popup${i}${j}`;
                popup.classList = "popup";
                const window = document.createElement("div");
                window.id = `window${i}${j}`;
                window.classList = "window";
                const titleBar = document.createElement("div");
                titleBar.id = `titleBar${i}${j}`;
                titleBar.classList = "title-bar";
                const titleBarText = document.createElement("div");
                titleBarText.id = `titleBarText${i}${j}`;
                titleBarText.classList = "title-bar-text";
                titleBarText.textContent = titles[j]
                const titleBarControls = document.createElement("div");
                titleBarControls.id = `titleBarControls${i}${j}`;
                titleBarControls.classList = "title-bar-controls";
                const minButton = document.createElement("Button");
                minButton.id = `minButton${i}${j}`;
                minButton.ariaLabel = "Minimize";
                const maxButton = document.createElement("Button");
                maxButton.id = `maxButton${i}${j}`;
                maxButton.ariaLabel = "Maximize";
                const closeButton = document.createElement("Button");
                closeButton.id = `closeButton${i}${j}`;
                closeButton.ariaLabel = "Close";
                const windowBody = document.createElement("div");
                windowBody.id = `windowBody${i}${j}`;
                windowBody.classList = "window-body";
                const bottomPanel = document.createElement("table");
                bottomPanel.id = `bottomPanel${i}${j}`;
                bottomPanel.style.backgroundColor = "transparent";
                bottomPanel.style.margin = "auto";
                const panelRow = document.createElement("tr");
                panelRow.id = `panelRow${i}${j}`;
                panelRow.style.paddingTop = "1rem";
                const leftCell = document.createElement("td");
                leftCell.id = `leftCell${i}${j}`;
                leftCell.style.paddingRight = "0.5rem";
                const midCell = document.createElement("td");
                midCell.id = `midCell${i}${j}`;
                midCell.style.textAlign = "center";
                midCell.style.paddingLeft = "0.5rem";
                midCell.style.paddingRight = "0.5rem";
                midCell.style.backgroundColor = "white";
                const rightCell = document.createElement("td");
                rightCell.id = `rightCell${i}${j}`;
                rightCell.style.paddingLeft = "0.5rem";
                const prevButton = document.createElement("button");
                prevButton.id = `prevButton${i}${j}`;
                prevButton.textContent = 'Previous';
                const nextButton = document.createElement("button");
                nextButton.id = `nextButton${i}${j}`;
                nextButton.textContent = 'Next';

                const img = document.createElement("img");
                img.id = `img${i}${j}`;
                img.src = images[j];
                img.alt = texts[j];
                img.classList = "art-display";

                const txt = document.createElement("div");
                txt.id = `txt${i}${j}`;
                txt.textContent = texts[j];
                txt.style.whiteSpace = "pre-line";

                // Add functionality to each of the new components
                const popupButton = document.getElementById(`popupButton${i}${j}`);

                popupButton.addEventListener('click', function() {
                    popup.style.display = 'block';
                    popupOverlay.style.display = 'block';
                    PortfolioManager.activeBucket = i;
                    PortfolioManager.activePiece = j;
                });

                // Close popup
                const closePopupHandler = function() {
                    popup.style.display = 'none';
                    popupOverlay.style.display = 'none';
                    PortfolioManager.activeBucket = -1;
                    PortfolioManager.activePiece = -1;
                };

                closeButton.addEventListener('click', closePopupHandler);
                popupOverlay.addEventListener('click', closePopupHandler);

                prevButton.addEventListener('click', function() {
                    if (!(PortfolioManager.is_first())) {
                        PortfolioManager.show_previous_picture();
                    };
                })

                nextButton.addEventListener('click', function() {
                    if (!(PortfolioManager.is_last())) {
                        PortfolioManager.show_next_picture();
                    };
                });

                // Add all the components to the HTML page
                // popupOverlay.appendChild(popup);
                popup.appendChild(window);
                window.appendChild(titleBar);
                titleBar.appendChild(titleBarText);
                titleBar.appendChild(titleBarControls);
                titleBarControls.appendChild(minButton);
                titleBarControls.appendChild(maxButton);
                titleBarControls.appendChild(closeButton);
                window.appendChild(windowBody);
                windowBody.appendChild(img);
                windowBody.appendChild(bottomPanel);
                bottomPanel.appendChild(panelRow);
                panelRow.appendChild(leftCell);
                panelRow.appendChild(midCell);
                panelRow.appendChild(rightCell);
                leftCell.appendChild(prevButton);
                midCell.appendChild(txt);
                rightCell.appendChild(nextButton);

                const portfolio_page = document.getElementById(id);
                portfolio_page.appendChild(popupOverlay);
                portfolio_page.appendChild(popup);
            }
        }
    },

};

PortfolioManager.load_popup_elements();
PortfolioManager.is_last();	
