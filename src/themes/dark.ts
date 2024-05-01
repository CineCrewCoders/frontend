import { ThemeOptions, createTheme } from "@mui/material/";

const background = "#34393f";
const primary = "#10a4f9";
const primaryContrastText = "#e3e3e3";
const secondary = "#cdcdcd";
const secondaryContrastText = "#303030";
const primaryText = "#CFCFCF";
const secondaryText = "#B0B0B0";
const disabledText = "#B0B0B0";
const paperBackground = "#595959";

function shadeHexColor(color: string, percent: number) {
    const f = parseInt(color.slice(1), 16);
    const t = percent < 0 ? 0 : 255;
    const p = percent < 0 ? percent * -1 : percent;
    const R = f >> 16;
    const G = (f >> 8) & 0x00ff;
    const B = f & 0x0000ff;
    return `#${(
        0x1000000 +
        (Math.round((t - R) * p) + R) * 0x10000 +
        (Math.round((t - G) * p) + G) * 0x100 +
        (Math.round((t - B) * p) + B)
    )
        .toString(16)
        .slice(1)}`;
}

const dark: ThemeOptions = {
    typography: {
        fontFamily: ["Quicksand", "Calibri", "sans-serif"].join(","),
        caption: {
            fontWeight: 400,
            fontSize: 14
        },
        fontWeightRegular: 400,
        fontWeightBold: 600,
        h1: {
            fontWeight: 600,
            fontSize: 28
        },
        h2: {
            fontWeight: 600,
            fontSize: 23
        },
        h3: {
            fontWeight: 600,
            fontSize: 20
        },
        h4: {
            fontWeight: 600,
            fontSize: 18
        },
        h5: {
            fontWeight: 600,
            fontSize: 18
        },
        h6: {
            fontWeight: 600,
            fontSize: 16
        },
        body1: {
            fontWeight: 500,
            fontSize: 16
        },
        body2: {
            fontWeight: 500,
            fontSize: 16
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: `linear-gradient(145deg, ${shadeHexColor(
                        primary,
                        -0.2
                    )}, ${shadeHexColor(primary, -0.4)})`,
                    boxShadow: `3px 3px 6px rgba(0, 0, 0, 0.3), -3px -3px 6px rgba(180, 180, 180, 0.2)`,
                    shadows: ["none"]
                }
            }
        },
        MuiSlider: {
            styleOverrides: {
                thumb: {
                    marginTop: -7,
                    height: 15,
                    width: 15,
                    background: `linear-gradient(145deg, ${primary}, ${shadeHexColor(
                        primary,
                        -0.4
                    )})`,
                    boxShadow: `3px 3px 6px rgba(0, 0, 0, 0.3), -3px -3px 6px rgba(180, 180, 180, 0.2)`
                },
                track: {
                    opacity: "100%",
                    marginTop: -1,
                    height: 4,
                    borderRadius: 4,
                    boxShadow: `inset 1px 1px 2px rgba(0, 0, 0, 0.5), inset -1px -1px 2px rgba(180, 180, 180, 0.4)`
                },
                rail: {
                    opacity: "100%",
                    marginTop: -1,
                    height: 4,
                    borderRadius: 4,
                    boxShadow: `inset 1px 1px 2px rgba(0, 0, 0, 0.5), inset -1px -1px 2px rgba(180, 180, 180, 0.4)`
                }
            }
        },
        MuiStepConnector: {
            styleOverrides: {
                line: {
                    borderColor: disabledText
                }
            }
        },
        MuiStepIcon: {
            styleOverrides: {
                root: {
                    boxShadow: `4px 4px 8px rgba(0, 0, 0, ${0.3}), -4px -4px 8px rgba(255, 255, 255, ${0.07})`,
                    borderRadius: "50%",
                    color: shadeHexColor(background, 0.1),
                    "&$active": {
                        color: shadeHexColor(primary, -0.2)
                    },
                    "&$completed": {
                        color: shadeHexColor(primary, -0.2),
                        borderRadius: "50%",
                        background: "white"
                    }
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    backgroundColor: shadeHexColor(background, 0.05),
                    boxShadow: `3px 3px 6px rgba(0, 0, 0, 0.25), -3px -3px 6px rgba(255, 255, 255, ${0.06})`,
                    padding: 8,
                    "&:hover": {
                        backgroundColor: shadeHexColor(background, 0.05)
                    },
                    "&:active": {
                        boxShadow: `inset 6px 6px 12px rgba(0, 0, 0, 0.5), inset -6px -6px 12px rgba(180, 180, 180, 0.4)`
                    }
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    boxShadow: `5px 5px 25px 2px rgba(0,0,0,0.4)`,
                    backgroundColor: shadeHexColor(background, 0.3),
                    color: primaryText
                }
            }
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    boxShadow: `6px 6px 12px rgba(0, 0, 0, ${0.25}), -6px -6px 12px rgba(255, 255, 255, ${0.1})`,
                    "&:active": {
                        boxShadow: `inset 6px 6px 12px rgba(0, 0, 0, 0.5), inset -6px -6px 12px rgba(180, 180, 180, 0.4)`
                    }
                },
                primary: {
                    background: `linear-gradient(145deg, ${primary}, ${shadeHexColor(
                        primary,
                        -0.4
                    )})`,
                    "&:hover": {
                        background: `linear-gradient(145deg, ${shadeHexColor(
                            primary,
                            -0.15
                        )}, ${shadeHexColor(primary, -0.45)})`
                    },
                    "&:active": {
                        background: primary
                    },
                    "&:disabled": {
                        background: shadeHexColor(background, 0.2)
                    }
                },
                secondary: {
                    background: `linear-gradient(145deg, ${secondary}, ${shadeHexColor(
                        secondary,
                        -0.4
                    )})`,
                    "&:hover": {
                        background: `linear-gradient(145deg, ${shadeHexColor(
                            secondary,
                            -0.15
                        )}, ${shadeHexColor(secondary, -0.45)})`
                    },
                    "&:active": {
                        background: secondary
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    borderRadius: "20px",
                    background: `linear-gradient(145deg, ${primary}, ${shadeHexColor(
                        primary,
                        -0.4
                    )})`,
                    boxShadow: `5px 5px 10px rgba(0, 0, 0, ${0.2}), -5px -5px 10px rgba(255, 255, 255, ${0.1})`,
                    "&:hover": {
                        background: `linear-gradient(145deg, ${shadeHexColor(
                            primary,
                            -0.15
                        )}, ${shadeHexColor(primary, -0.45)})`,
                        boxShadow: `5px 5px 10px rgba(0, 0, 0, ${0.2}), -5px -5px 10px rgba(255, 255, 255, ${0.1})`
                    },
                    "&:active": {
                        background: primary,
                        boxShadow: `inset 5px 5px 10px rgba(0, 0, 0, 0.5), inset -5px -5px 10px rgba(180, 180, 180, 0.4)`
                    }
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                rounded: {
                    background: `linear-gradient(145deg, ${shadeHexColor(
                        background,
                        0.1
                    )}, ${shadeHexColor(background, 0)})`,
                    borderRadius: "20px"
                },
                elevation1: {
                    background: shadeHexColor(background, 0.05),
                    boxShadow: `3px 3px 6px rgba(0, 0, 0, 0.2), -2px -2px 4px rgba(255, 255, 255, ${0.05})`,
                    borderRadius: "10px"
                },
                elevation7: {
                    boxShadow: `10px 10px 35px 6px rgba(0,0,0,${0.5})`
                }
            }
        },
        MuiCssBaseline: {
            styleOverrides: {
                "@global": {
                    body: {
                        background: `linear-gradient(145deg, ${background}, ${shadeHexColor(
                            background,
                            -0.57
                        )})`
                    }
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    "& h1": {
                        fontWeight: 600,
                        fontSize: 28
                    },
                    "& h2": {
                        fontWeight: 600,
                        fontSize: 23,
                        marginTop: 50
                    },
                    "& h3": {
                        fontWeight: 600,
                        fontSize: 20,
                        marginBottom: -4,
                        marginTop: 30
                    },
                    "& h4": {
                        fontWeight: 600,
                        fontSize: 18,
                        marginTop: 20
                    },
                    "& h5": {
                        fontWeight: 600,
                        fontSize: 18
                    },
                    "& h6": {
                        fontWeight: 600,
                        fontSize: 16
                    },
                    "& body": {
                        fontWeight: 500,
                        fontSize: 16
                    },
                    "& a": {
                        color: primary
                    }
                }
            }
        }
    },
    palette: {
        mode: "dark",
        background: {
            default: background,
            paper: paperBackground
        },
        primary: {
            main: primary,
            contrastText: primaryContrastText
        },
        secondary: {
            main: secondary,
            contrastText: secondaryContrastText
        },
        text: {
            primary: primaryText,
            secondary: secondaryText,
            disabled: disabledText
        }
    },
    spacing: 1
};

export const darkTheme = createTheme(dark);