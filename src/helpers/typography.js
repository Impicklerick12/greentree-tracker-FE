export const typographyStyle = (headingFont, paragraphFont) => {
    let style = {
        h1: {
            fontFamily: headingFont
        },
        h2: {
            fontFamily: headingFont
        },
        h3: {
            fontFamily: headingFont
        },
        h4: {
            fontFamily: headingFont
        },
        h5: {
            fontFamily: headingFont
        },
        h6: {
            fontFamily: paragraphFont
        },
        body1: {
            fontFamily: paragraphFont
        }
    }
    return style
}