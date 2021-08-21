import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {AppProvider, Avatar, Icon, VisuallyHidden, ActionList, Frame, TopBar} from '@shopify/polaris';
import {ArrowLeftMinor, QuestionMarkMajor} from '@shopify/polaris-icons';
import styles from "../../pages/Admin/Home/AdminHome.module.css"

const Topbar = props => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const toggleIsUserMenuOpen = useCallback(
        () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
        [],
    );

    const toggleIsSecondaryMenuOpen = useCallback(
        () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
        [],
    );

    // const handleSearchResultsDismiss = useCallback(() => {
    //     setIsSearchActive(false);
    //     setSearchValue('');
    // }, []);
    //
    // const handleSearchChange = useCallback((value) => {
    //     setSearchValue(value);
    //     setIsSearchActive(value.length > 0);
    // }, []);

    const handleNavigationToggle = useCallback(() => {
        console.log('toggle navigation visibility');
    }, []);

    const theme = {
        logo: {
            width: 124,
            topBarSource:
                'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
            url: 'http://jadedpixel.com',
            accessibilityLabel: 'Jaded Pixel',
        },
    };

    const userMenuMarkup = (
        <TopBar.UserMenu
            actions={[
                {
                    items: [{content: 'Back to Shopify', icon: ArrowLeftMinor}],
                },
                {
                    items: [{content: 'Community forums'}],
                },
            ]}
            name="Dharma"
            detail="Jaded Pixel"
            initials="D"
            open={isUserMenuOpen}
            onToggle={toggleIsUserMenuOpen}
        />
    );

    // const searchResultsMarkup = (
    //     <ActionList
    //         items={[{content: 'Shopify help center'}, {content: 'Community forums'}]}
    //     />
    // );

    // const searchFieldMarkup = (
    //     <TopBar.SearchField
    //         onChange={handleSearchChange}
    //         value={searchValue}
    //         placeholder="Search"
    //         showFocusBorder
    //     />
    // );

    const secondaryMenuMarkup = (
        <div className={styles.container}>
            <TopBar.Menu
                activatorContent={
                    <span>
              <Icon source={QuestionMarkMajor} />
              <VisuallyHidden>Secondary menu</VisuallyHidden>
            </span>
                }
                open={isSecondaryMenuOpen}
                onOpen={toggleIsSecondaryMenuOpen}
                onClose={toggleIsSecondaryMenuOpen}
                actions={[
                    {
                        items: [{content: 'Community forums'}],
                    },
                ]}
            />
            <TopBar.Menu
                activatorContent={
                    <span>
                        <h2>Login</h2>
                    </span>
                }
            />
        </div>
    );

    const topBarMarkup = (
        <TopBar
            showNavigationToggle
            userMenu={userMenuMarkup}
            secondaryMenu={secondaryMenuMarkup}
            // searchResultsVisible={isSearchActive}
            // searchField={searchFieldMarkup}
            // searchResults={searchResultsMarkup}
            // onSearchResultsDismiss={handleSearchResultsDismiss}
            onNavigationToggle={handleNavigationToggle}
        />
    );
    return (
        <div style={{height: '250px'}}>
            <AppProvider
                theme={theme}
                i18n={{
                    Polaris: {
                        Avatar: {
                            label: 'Avatar',
                            labelWithInitials: 'Avatar with initials {initials}',
                        },
                        Frame: {skipToContent: 'Skip to content'},
                        TopBar: {
                            toggleMenuLabel: 'Toggle menu',
                            // SearchField: {
                            //     clearButtonLabel: 'Clear',
                            //     search: 'Search',
                            // },
                        },
                    },
                }}
            >
                <Frame topBar={topBarMarkup} />
            </AppProvider>
        </div>
    );
};

Topbar.propTypes = {
    
};

export default Topbar;