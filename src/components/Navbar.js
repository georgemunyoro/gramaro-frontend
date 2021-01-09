import {useStyletron} from 'baseui';
import {
  Unstable_AppNavBar as AppNavBar,
} from 'baseui/app-nav-bar';
import {Menu as MenuIcon} from 'baseui/icon';
import {Layer} from 'baseui/layer';
import {StyledLink} from 'baseui/link';
import * as React from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router';

const getMainNav = (username) => ([
  {
    icon : MenuIcon,
    item : {label : 'My Notes'},
    mapItemToNode : renderItem,
    mapItemToString : renderItem
  },
  {
    icon : MenuIcon,
    item : {label : 'New Note'},
    mapItemToNode : renderItem,
    mapItemToString : renderItem
  },
  {
    icon : MenuIcon,
    item : {label : username},
    mapItemToNode : renderItem,
    mapItemToString : renderItem
  }
])

const STRANGER_NAV = [
  {
    icon : MenuIcon,
    item : {label : 'Signup'},
    mapItemToNode : renderItem,
    mapItemToString : renderItem,
  },
  {
    icon : MenuIcon,
    item : {label : 'Login'},
    mapItemToNode : renderItem,
    mapItemToString : renderItem,
  }
];

function renderItem(item) { return item.label }

function isActive(arr, item, activeItem) {
  let active = false;
  for (let i = 0; i < arr.length; i++) {
    const elm = arr[i];
    if (elm === item) {
      if (item === activeItem)
        return true;
      return isActive(
          (item && item.nav) || [],
          activeItem,
          activeItem,
      );
    } else if (elm.nav) {
      active = isActive(elm.nav || [], item, activeItem);
    }
  }
  return active;
}
export default () => {
  const history = useHistory();

  const loggedIn = useSelector(state => state.loggedIn);
  const username = useSelector(state => state.username);

  const [isNavBarVisible, ] = React.useState(true);
  const [css] = useStyletron();

  const [activeNavItem, setActiveNavItem] = React.useState();
  const containerStyles = css({
    boxSizing : 'border-box',
    width : '100vw',
    position : 'fixed',
    top : '0',
    left : '0',
  });

  const appDisplayName = (
    <StyledLink
  $style =
  {
    {
      textDecoration: 'none', fontWeight: 1000, color: 'inherit',
          ':hover': {color: 'inherit'}, ':visited': {color: 'inherit'},
    }
  } href =
      {'#'} > gramaro <
      /StyledLink>
  );

  return (
    <React.Fragment>
      {isNavBarVisible ? (
        <Layer>
          <div className={containerStyles} style={{zIndex: 100}}>
            <AppNavBar
              appDisplayName={appDisplayName}
              mainNav={loggedIn ? getMainNav(username) : STRANGER_NAV}
              isNavItemActive={({item}) => {
                return (
                  item === activeNavItem ||
                  isActive(getMainNav(username), item, activeNavItem)
                );
              }}

              onNavItemSelect={({item}) => {
                if (item === activeNavItem) return;
                setActiveNavItem(item);
				console.log(item.item.label)
				switch (item.item.label) {
            case "Home":
					history.push({ pathname: '/' }); break; case "New Note":
          history.push({pathname : '/create'});
      break; case "Login": history.push({pathname : '/login'}); break;
      case "Signup": history.push({pathname : '/signup'}); break;
      case "My Notes": history.push({pathname : '/dashboard'}); break;
      default: history.push({pathname : '/dashboard'}); break;
}
}
}
            />
          </div>
        </Layer>
      ) : null}
    </React.Fragment>
  );
            }
            ;
