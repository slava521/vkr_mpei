import {memo, useEffect} from "react";

import {useLocalStorage, useMediaQuery} from "usehooks-ts";

import classes from "./appThemeButton.module.scss";
import variables from './export-variables.module.scss'

const setVariable = (property: string, value: string) =>
    document.documentElement.style.setProperty(property, value)

const AppThemeButton = memo(() => {
    const matches = useMediaQuery('(prefers-color-scheme: dark)', {
        initializeWithValue: false
    })
    const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('darkMode', matches, {
        initializeWithValue: false
    })

    useEffect(() => {
        if (isDarkMode) {
            setVariable('--primary-color', variables['primaryColorDark'])
            setVariable('--primary-color-rgb', variables['primaryColorDarkRgb'])
            setVariable('--primary-bg', variables['primaryBgDark'])
            setVariable('--primary-bg-modified', variables['primaryBgDarkLighter'])
            setVariable('--secondary-bg', variables['secondaryBgDark'])
            setVariable('--secondary-bg-rgb', variables['secondaryBgDarkRgb'])
            setVariable('--secondary-bg-darker', variables['secondaryBgDarkDarker'])
            setVariable('--filter-primary-color', variables['filterPrimaryColorDark'])
        }
        else {
            setVariable('--primary-color', variables['primaryColorLight'])
            setVariable('--primary-color-rgb', variables['primaryColorLightRgb'])
            setVariable('--primary-bg', variables['primaryBgLight'])
            setVariable('--primary-bg-modified', variables['primaryBgLightDarker'])
            setVariable('--secondary-bg', variables['secondaryBgLight'])
            setVariable('--secondary-bg-rgb', variables['secondaryBgLightRgb'])
            setVariable('--secondary-bg-darker', variables['secondaryBgLightDarker'])
            setVariable('--filter-primary-color', variables['filterPrimaryColorLight'])
        }
    }, [isDarkMode]);

    return (
        <button onClick={()=>setIsDarkMode(!isDarkMode)} className={classes.appThemeButton}>
            <img src={isDarkMode ? '/darkMode.svg' : '/lightMode.svg'} alt=""/>
        </button>
    );
});

AppThemeButton.displayName = 'AppThemeButton'

export default AppThemeButton;
