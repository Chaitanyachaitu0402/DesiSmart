import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link as ScrollToLink, animateScroll as scroll } from "react-scroll";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import logo_black from "../../assets/logo_black.png";
import {
  Badge,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  useMediaQuery,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { groceryContext } from "../Layout/Layout";
import { ShoppingCartRounded, AccountCircle } from "@mui/icons-material";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import "./Navbar.css";

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: true,
    });
  };
  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 20, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Links = ({ drawer, setIsOpenDrawer, isOpenDrawer }) => {
  const location = useLocation();
  const { pathname } = location;

  class LinkClass {
    constructor(id, linkName) {
      this.id = id;
      this.linkName = linkName;
    }
  }

  const pageLink = [
    new LinkClass(0, "Home"),
    new LinkClass(1, "About"),
    new LinkClass(2, "Categories"),
  ];
  const componentsLink = [
    new LinkClass("services", "Services"),
    new LinkClass("contact", "Contact"),
  ];

  return drawer ? (
    <List sx={{ mt: 1.5 }}>
      {pageLink.map((link) => (
        <Link to={`/${link.linkName.toLowerCase()}`} key={link.id}>
          <ListItem sx={{ minWidth: "12rem" }} disablePadding>
            <ListItemButton
              onClick={() => setIsOpenDrawer(!isOpenDrawer)}
              sx={{ ":hover": { bgcolor: "#E0F3D7" } }}
            >
              <ListItemText
                sx={{ marginLeft: "0.4rem" }}
                primary={link.linkName}
              />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
      {componentsLink.map((link, i) =>
        link.linkName === "Contact" ? (
          <Link to={`/${link.linkName.toLowerCase()}`} key={i}>
            <ListItem sx={{ minWidth: "12rem" }} disablePadding>
              <ListItemButton
                onClick={() => setIsOpenDrawer(!isOpenDrawer)}
                sx={{ ":hover": { bgcolor: "#E0F3D7" } }}
              >
                <ListItemText
                  sx={{ marginLeft: "0.4rem" }}
                  primary={link.linkName}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ) : (
          <ScrollToLink
            to={link.id}
            key={i}
            smooth={true}
            spy={true}
            offset={-70}
            duration={80}
          >
            <ListItem
              disabled={
                link.id !== "footer" && pathname !== "/" && pathname !== "/home"
              }
              key={i}
              sx={{ minWidth: "12rem" }}
              disablePadding
            >
              <ListItemButton
                onClick={() => setIsOpenDrawer(!isOpenDrawer)}
                sx={{ ":hover": { bgcolor: "#E0F3D7" } }}
              >
                <ListItemText
                  sx={{ marginLeft: "0.4rem" }}
                  primary={link.linkName}
                />
              </ListItemButton>
            </ListItem>
          </ScrollToLink>
        )
      )}
    </List>
  ) : (
    <ul className={`flex p-0 sm:space-x-8 space-x-5' text-black`}>
      {pageLink.map((li) => (
        <Link to={`/${li.linkName.toLowerCase()}`} key={li.id}>
          <li className="sm:text-base hover:text-gray-800 hover:scale-[0.99] text-sm">
            {li.linkName}
          </li>
        </Link>
      ))}
      {componentsLink.map((link, i) =>
        link.linkName === "Contact" ? (
          <Link to={`/${link.linkName.toLowerCase()}`} key={i}>
            <li className="sm:text-base hover:text-gray-800 hover:scale-[0.99] text-sm">
              {link.linkName}
            </li>
          </Link>
        ) : (
          <li
            key={i}
            className={`sm:text-base ${
              link.id !== "footer" && pathname !== "/" && pathname !== "/home"
                ? "hidden"
                : "block"
            } hover:text-gray-800 transition-all duration-500 hover:scale-[0.99] text-sm cursor-pointer`}
          >
            <ScrollToLink
              to={link.id}
              activeClass="active"
              smooth={true}
              spy={true}
              offset={-70}
              duration={500}
            >
              {link.linkName}
            </ScrollToLink>
          </li>
        )
      )}
    </ul>
  );
};

export const userLoggedIn = JSON.parse(sessionStorage.getItem("userLoggedIn"));

const Navbar = (props) => {
  const [isNavBarElevated, setIsNavbarElevated] = React.useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterValue, setFilterValue] = React.useState("");
  const isExtraSmallScreen = useMediaQuery("(max-width: 664px)");
  const isSemiMediumScreen = useMediaQuery("(max-width: 900px)");
  const isLargeScreen = useMediaQuery("(max-width:1280px)");

  window.addEventListener("scroll", () => {
    setIsNavbarElevated(window.scrollY > 0);
  });
  React.useEffect(() => {
    setIsNavbarElevated(window.pageYOffset > 0);
    setInterval(() => {
      const userLoggedIn = localStorage.getItem("grocery_userLoggedIn");
      setIsUserLoggedIn(userLoggedIn);
      console.log("isUserLoggedIn ==========> ", isUserLoggedIn);
    }, 1000);
  }, []);

  const navigate = useNavigate();
  const { cartItemsState } = React.useContext(groceryContext);
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(true);
  const [cartItems] = cartItemsState;

  const [openAlert, setOpenAlert] = React.useState(false);

  const handleLogOut = () => {
    // window.localStorage.removeItem("isLogedIn");
    setIsUserLoggedIn(false);
    setOpenAlert(!openAlert);
    localStorage.clear();
    navigate("/login");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/products?search=${searchTerm}`);
  };

  // Example product list (replace with your actual product data)
  const productList = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
    { id: 4, name: "Another Product" },
  ];

  // Filtering products based on search term and filter value
  const filteredProducts = productList.filter((product) => {
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterValue === "all" || product.category === filterValue; // Replace 'category' with your actual property name
    return matchesSearchTerm && matchesFilter;
  });

  return (
    <>
      <SuccessAlert
        state={[openAlert, setOpenAlert]}
        massage={"Log out successfully"}
      />

      <nav className="fixed z-50">
        <CssBaseline />
        <ElevationScroll {...props}>
          <AppBar
            sx={{
              bgcolor: isNavBarElevated ? "white" : "transparent",
              transition: "all 150ms ease-in-out",
            }}
          >
            <Toolbar>
              <Container
                disableGutters={isLargeScreen}
                sx={{ display: "flex", px: isLargeScreen ? 0.5 : 0 }}
              >
                {isSemiMediumScreen && (
                  <IconButton
                    color="black"
                    aria-label="open drawer"
                    onClick={() => setIsOpenDrawer(!isOpenDrawer)}
                    edge="start"
                    sx={{ mr: 1 }}
                  >
                    <MenuIcon fontSize="inherit" />
                  </IconButton>
                )}

                <div className="flex w-full justify-between items-center">
                  <Link to={"/home"}>
                    <img
                      className="sm:max-h-14 max-h-11 my-auto cursor-pointer"
                      src={logo_black}
                      alt="grocery"
                    />
                  </Link>

                  <div className="flex items-center space-x-8">
                    {isSemiMediumScreen ? (
                      <Drawer
                        anchor={"left"}
                        open={isOpenDrawer}
                        onClose={() => setIsOpenDrawer(!isOpenDrawer)}
                      >
                        <Links
                          setIsOpenDrawer={setIsOpenDrawer}
                          isOpenDrawer={isOpenDrawer}
                          drawer={true}
                        />
                      </Drawer>
                    ) : (
                      <Links
                        setIsOpenDrawer={setIsOpenDrawer}
                        isOpenDrawer={isOpenDrawer}
                      />
                    )}

                    {/* Search and Filter */}
                    <div className="filter flex items-center space-x-3 md:flex 3xs:hidden">
                      {/* {Filter} */}
                      {/* <div className="group inline-block">
  <button
    className="outline-none focus:outline-none border px-3 py-1 bg-[#2E7D32] rounded-md flex items-center min-w-28"
  >
    <span className="pr-1 font-semibold flex-1">Filter</span>
    <span>
      <svg
        className="fill-current h-4 w-4 transform group-hover:-rotate-180
        transition duration-150 ease-in-out"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
        />
      </svg>
    </span>
  </button>
  <ul
    className="bg-[#2E7D32] border rounded-md transform scale-0 group-hover:scale-100 absolute 
  transition duration-150 ease-in-out origin-top min-w-32"
  >
    <li className="li rounded-sm px-3 py-1 hover:bg-white hover:text-black">
    <button
        className="w-full text-left flex items-center outline-none focus:outline-none"
      >
        <span className="pr-1 flex-1">Groceries</span>
        <span className="mr-auto">
          <svg
            className="fill-current h-4 w-4
            transition duration-150 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </span>
      </button>
      <ul
        className="ul bg-[#2E7D32] border rounded-md absolute -top-0 right-0 
  transition duration-150 ease-in-out origin-top-left
  min-w-32
  "
      >
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">GoGreen</li>
        <li className="rounded-sm relative px-3 py-1 hover:bg-white hover:text-black text-white">
          <button
            className="w-full text-left flex items-center outline-none focus:outline-none "
          >
            <span className="pr-1 flex-1 ">Sweeteners</span>
            
          </button>
          
        </li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Atta's & Flours</li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Pulse's & Dal's</li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Nuts & Dry Fruits</li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Ghee's & Oils</li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Papads (Fryums)</li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Food Colors</li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Tea & Coffee</li>


      </ul>
    </li>
    <li className="li rounded-sm px-3 py-1 hover:bg-white hover:text-black">Vegetables</li>
    <li className="li rounded-sm relative px-3 py-1 hover:bg-white hover:text-black">
      Fruits
    </li>
    <li className="li rounded-sm px-3 py-1 hover:bg-white hover:text-black text-white">
    <button
        className="w-full text-left flex items-center outline-none focus:outline-none"
      >
        <span className="pr-1 flex-1">Household</span>
        <span className="mr-auto">
          <svg
            className="fill-current h-4 w-4
            transition duration-150 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </span>
      </button>
      <ul
        className="ul bg-[#2E7D32] border rounded-md absolute top-14 right-0 
  transition duration-150 ease-in-out origin-top-left
  min-w-32
  "
      >
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">GoGreen</li>
        <li className="rounded-sm relative px-3 py-1 hover:bg-white hover:text-black text-white">
          <button
            className="w-full text-left flex items-center outline-none focus:outline-none "
          >
            <span className="pr-1 flex-1 ">Accessories</span>
            
          </button>
          
        </li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Beauty</li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Health & Wellbeing</li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Party & Fun</li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Rakhi</li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Pet Food</li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Stationery</li>

      </ul>
    </li>
    <li className="li rounded-sm px-3 py-1 hover:bg-white hover:text-black text-white">
    <button
        className="w-full text-left flex items-center outline-none focus:outline-none"
      >
        <span className="pr-1 flex-1">Spices</span>
        <span className="mr-auto">
          <svg
            className="fill-current h-4 w-4
            transition duration-150 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </span>
      </button>
      <ul
        className="ul bg-[#2E7D32] border rounded-md absolute top-32 right-0 
  transition duration-150 ease-in-out origin-top-left
  min-w-32
  "
      >
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Herbs</li>
        <li className="rounded-sm relative px-3 py-1 hover:bg-white hover:text-black text-white">
          <button
            className="w-full text-left flex items-center outline-none focus:outline-none "
          >
            <span className="pr-1 flex-1 ">Ground Spices</span>
            
          </button>
          
        </li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Whold Spices</li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Pastes & Sauces</li>
        

      </ul>
    </li>
    <li className="li rounded-sm px-3 py-1 hover:bg-white hover:text-black text-white">
    <button
        className="w-full text-left flex items-center outline-none focus:outline-none"
      >
        <span className="pr-1 flex-1">Pickels</span>
        <span className="mr-auto">
          <svg
            className="fill-current h-4 w-4
            transition duration-150 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </span>
      </button>
      <ul
        className="ul bg-[#2E7D32] border rounded-md absolute top-28 right-0 
  transition duration-150 ease-in-out origin-top-left
  min-w-32
  "
      >
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Village Style</li>
        <li className="rounded-sm relative px-3 py-1 hover:bg-white hover:text-black text-white">
          <button
            className="w-full text-left flex items-center outline-none focus:outline-none "
          >
            <span className="pr-1 flex-1 ">Telugu Foods</span>
            
          </button>
          
        </li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Non-Veg Pickels</li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Karam Podi</li>
        

      </ul>
    </li>
    <li className="li rounded-sm px-3 py-1 hover:bg-white hover:text-black text-white">
    <button
        className="w-full text-left flex items-center outline-none focus:outline-none"
      >
        <span className="pr-1 flex-1">Sweets</span>
        <span className="mr-auto">
          <svg
            className="fill-current h-4 w-4
            transition duration-150 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </span>
      </button>
      <ul
        className="ul bg-[#2E7D32] border rounded-md absolute top-14 right-0 
  transition duration-150 ease-in-out origin-top-left
  min-w-32
  "
      >
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Desi Sweets</li>
        <li className="rounded-sm relative px-3 py-1 hover:bg-white hover:text-black text-white">
          <button
            className="w-full text-left flex items-center outline-none focus:outline-none "
          >
            <span className="pr-1 flex-1 ">Biscuits</span>
            
          </button>
          
        </li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Chocolates</li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Chips</li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Protein Bars & Drinks</li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">GRB</li>
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">TeluguFoods</li>

      </ul>
    </li>
    <li className="li rounded-sm px-3 py-1 hover:bg-white hover:text-black text-white">Pooja</li>
    <li className="li rounded-sm px-3 py-1 hover:bg-white hover:text-black text-white">Breakfast</li>
    <li className="li rounded-sm px-3 py-1 hover:bg-white hover:text-black text-white">Fun & Party</li>
    <li className="li rounded-sm px-3 py-1 hover:bg-white hover:text-black text-white">Rice</li>
    <li className="li rounded-sm px-3 py-1 hover:bg-white hover:text-black text-white">
    <button
        className="w-full text-left flex items-center outline-none focus:outline-none"
      >
        <span className="pr-1 flex-1">Beverages</span>
        <span className="mr-auto">
          <svg
            className="fill-current h-4 w-4
            transition duration-150 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </span>
      </button>
      <ul
        className="ul bg-[#2E7D32] border rounded-md absolute top-80 right-0 
  transition duration-150 ease-in-out origin-top-left
  min-w-32
  "
      >
        <li className="px-3 py-1 hover:bg-white hover:text-black text-white">Nutritional Drinks</li>
        <li className="rounded-sm relative px-3 py-1 hover:bg-white hover:text-black text-white">
          <button
            className="w-full text-left flex items-center outline-none focus:outline-none "
          >
            <span className="pr-1 flex-1 ">Tea & Coffee</span>
            
          </button>
          
        </li>
        

      </ul>
    </li>
  </ul>
</div> */}

                      {/* {Search} */}

                      <form onSubmit={handleSearchSubmit} className="m-0 p-0">
                        <div className="flex ">
                          {/* <input
                            type="text"
                            className="text-black items-center text-center bg-transparent border-2 rounded-xl border-black m-0"
                            label="Search products"
                            size="small"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{ marginRight: "8px" }}
                          /> */}

<div className="container3">
    <input type="text" name="text" required="" placeholder="Search the product.." className="input text-black items-center bg-transparent border-2  border-black m-0"
    label="Search products"
    size="small"
    value={searchTerm}
    onChange={handleSearchChange}
    style={{ marginRight: "8px" }}
    />
    <div className="icon">
        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon text-black" viewBox="0 0 512 512">
            <title>Search</title>
            <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path>
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M338.29 338.29L448 448"></path>
        </svg>
    </div>
</div>

                          {/* <button
                            type="submit"
                            
                            color="primary"
                            className="button"
                          >
                            <span>
                              <svg
                                viewBox="0 0 24 24"
                                height="24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"></path>
                              </svg>
                            </span>
                          </button> */}
                        </div>
                      </form>
                    </div>

                    <div className="space-x-2">
                      <Tooltip title="Cart">
                        <span>
                          <IconButton
                            onClick={() => navigate("/cart")}
                            sx={{ textTransform: "capitalize" }}
                            color="warning"
                          >
                            <Badge
                              badgeContent={cartItems.length}
                              sx={{
                                "& .MuiBadge-badge": {
                                  backgroundColor: "#2E7D32",
                                  color: "white",
                                },
                              }}
                            >
                              <ShoppingCartRounded fontSize="inherit" />
                            </Badge>
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Profile">
                        <IconButton
                          onClick={() => navigate("/profile")}
                          sx={{
                            textTransform: "capitalize",
                            "&:hover": { bgcolor: "#E0F3D7" },
                          }}
                          className="text-black"
                        >
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <div
                                style={{
                                  backgroundColor: "#2E7D32",
                                  color: "white",
                                  width: 10,
                                  height: 10,
                                  borderRadius: "50%",
                                  border: "2px solid white",
                                }}
                              />
                            }
                          >
                            <AccountCircle fontSize="inherit" />
                          </Badge>
                        </IconButton>
                      </Tooltip>

                      {!isUserLoggedIn ? (
                        <Button
                          onClick={() => navigate("/login")}
                          size={isExtraSmallScreen ? "small" : "medium"}
                          sx={{ textTransform: "capitalize" }}
                          color="success"
                          variant="contained"
                        >
                          Log in
                        </Button>
                      ) : (
                        <Button
                          size={isExtraSmallScreen ? "small" : "medium"}
                          onClick={handleLogOut}
                          sx={{ textTransform: "capitalize" }}
                          color="success"
                          variant="contained"
                        >
                          Log out
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Container>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar id="back-to-top-anchor" />

        <ScrollTop {...props}>
          <Fab color="warning" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </nav>
    </>
  );
};

export default Navbar;

// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import { Link as ScrollToLink, animateScroll as scroll } from 'react-scroll';
// import CssBaseline from '@mui/material/CssBaseline';
// import useScrollTrigger from '@mui/material/useScrollTrigger';
// import Box from '@mui/material/Box';
// import Fab from '@mui/material/Fab';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import Fade from '@mui/material/Fade';
// import logo_black from '../../assets/logo_black.png';
// import { Badge, Button, Container, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Tooltip, useMediaQuery, TextField } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { groceryContext } from '../Layout/Layout';
// import { ShoppingCartRounded, AccountCircle } from '@mui/icons-material';
// import SuccessAlert from '../SuccessAlert/SuccessAlert';
// import './Navbar.css';

// function ScrollTop(props) {
//     const { children, window } = props;
//     const trigger = useScrollTrigger({
//         target: window ? window() : undefined,
//         disableHysteresis: true,
//         threshold: 100,
//     });

//     const handleClick = () => {
//         scroll.scrollToTop({
//             duration: 500,
//             smooth: true,
//         });
//     }
//     return (
//         <Fade in={trigger}>
//             <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 20, right: 16 }}>
//                 {children}
//             </Box>
//         </Fade>
//     );
// }

// function ElevationScroll(props) {
//     const { children, window } = props;
//     const trigger = useScrollTrigger({
//         disableHysteresis: true,
//         threshold: 0,
//         target: window ? window() : undefined,
//     });

//     return React.cloneElement(children, {
//         elevation: trigger ? 4 : 0,
//     });
// }

// const Links = ({ drawer, setIsOpenDrawer, isOpenDrawer }) => {
//     const location = useLocation();
//     const { pathname } = location;

//     class LinkClass {
//         constructor(id, linkName) {
//             this.id = id;
//             this.linkName = linkName;
//         }
//     }

//     const pageLink = [new LinkClass(0, 'Home'), new LinkClass(1, 'About'), new LinkClass(2, 'Categories')];
//     const componentsLink = [new LinkClass('services', 'Services'), new LinkClass('contact', 'Contact')];

//     return drawer ? (
//         <List sx={{ mt: 1.5 }}>
//             {pageLink.map(link => (
//                 <Link to={`/${link.linkName.toLowerCase()}`} key={link.id}>
//                     <ListItem sx={{ minWidth: '12rem' }} disablePadding>
//                         <ListItemButton
//                             onClick={() => setIsOpenDrawer(!isOpenDrawer)}
//                             sx={{ ":hover": { bgcolor: '#E0F3D7' } }}>
//                             <ListItemText sx={{ marginLeft: '0.4rem' }} primary={link.linkName} />
//                         </ListItemButton>
//                     </ListItem>
//                 </Link>
//             ))}
//             {componentsLink.map((link, i) => (
//                 link.linkName === 'Contact' ?
//                     <Link to={`/${link.linkName.toLowerCase()}`} key={i}>
//                         <ListItem sx={{ minWidth: '12rem' }} disablePadding>
//                             <ListItemButton
//                                 onClick={() => setIsOpenDrawer(!isOpenDrawer)}
//                                 sx={{ ":hover": { bgcolor: '#E0F3D7' } }}>
//                                 <ListItemText sx={{ marginLeft: '0.4rem' }} primary={link.linkName} />
//                             </ListItemButton>
//                         </ListItem>
//                     </Link>
//                     :
//                     <ScrollToLink to={link.id} key={i} smooth={true} spy={true} offset={-70} duration={80}>
//                         <ListItem
//                             disabled={link.id !== 'footer' && pathname !== '/' && pathname !== '/home'}
//                             key={i}
//                             sx={{ minWidth: '12rem' }}
//                             disablePadding>
//                             <ListItemButton
//                                 onClick={() => setIsOpenDrawer(!isOpenDrawer)}
//                                 sx={{ ":hover": { bgcolor: '#E0F3D7' } }}>
//                                 <ListItemText sx={{ marginLeft: '0.4rem' }} primary={link.linkName} />
//                             </ListItemButton>
//                         </ListItem>
//                     </ScrollToLink>
//             ))}
//         </List>
//     ) : (
//         <ul className={`flex p-0 sm:space-x-8 space-x-5' text-black`}>
//             {pageLink.map(li => (
//                 <Link to={`/${li.linkName.toLowerCase()}`} key={li.id}>
//                     <li className='sm:text-base hover:text-gray-800 hover:scale-[0.99] text-sm'>
//                         {li.linkName}
//                     </li>
//                 </Link>
//             ))}
//             {componentsLink.map((link, i) => (
//                 link.linkName === 'Contact' ?
//                     <Link to={`/${link.linkName.toLowerCase()}`} key={i}>
//                         <li className='sm:text-base hover:text-gray-800 hover:scale-[0.99] text-sm'>
//                             {link.linkName}
//                         </li>
//                     </Link>
//                     :
//                     <li key={i} className={`sm:text-base ${link.id !== 'footer' && pathname !== '/' && pathname !== '/home' ? 'hidden' : 'block'} hover:text-gray-800 transition-all duration-500 hover:scale-[0.99] text-sm cursor-pointer`}>
//                         <ScrollToLink to={link.id} activeClass="active" smooth={true} spy={true} offset={-70} duration={500}>
//                             {link.linkName}
//                         </ScrollToLink>
//                     </li>
//             ))}
//         </ul>
//     );
// }

// export const userLoggedIn = JSON.parse(sessionStorage.getItem('userLoggedIn'));

// const Navbar = (props) => {
//     const [isNavBarElevated, setIsNavbarElevated] = React.useState(false);
//     const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);
//     const [searchTerm, setSearchTerm] = React.useState('');

//     const isExtraSmallScreen = useMediaQuery('(max-width: 664px)');
//     const isSemiMediumScreen = useMediaQuery('(max-width: 900px)');
//     const isLargeScreen = useMediaQuery('(max-width:1280px)');

//     window.addEventListener('scroll', () => {
//         setIsNavbarElevated(window.scrollY > 0);
//     });
//     React.useEffect(() => {
//         setIsNavbarElevated(window.pageYOffset > 0);
//         setInterval(() => {
//             const userLoggedIn = localStorage.getItem("grocery_userLoggedIn");
//             setIsUserLoggedIn(userLoggedIn);
//             console.log("isUserLoggedIn ==========> ", isUserLoggedIn);
//         }, 1000);
//     }, []);

//     const navigate = useNavigate();
//     const { cartItemsState } = React.useContext(groceryContext);
//     const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(true);
//     const [cartItems] = cartItemsState;

//     const [openAlert, setOpenAlert] = React.useState(false);

//     const handleLogOut = () => {
//         setIsUserLoggedIn(false);
//         setOpenAlert(!openAlert);
//         localStorage.clear();
//         navigate("/login");
//     }

//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//     }

//     const handleSearchSubmit = (event) => {
//         event.preventDefault();
//         navigate(`/products?search=${searchTerm}`);
//     }

//     return (
//         <>
//             <SuccessAlert
//                 state={[openAlert, setOpenAlert]}
//                 massage={'Log out successfully'} />

//             <nav className='fixed z-50'>
//                 <CssBaseline />
//                 <ElevationScroll {...props}>
//                     <AppBar sx={{ bgcolor: isNavBarElevated ? 'white' : 'transparent', transition: 'all 150ms ease-in-out' }}>
//                         <Toolbar>
//                             <Container disableGutters={isLargeScreen} sx={{ display: 'flex', px: isLargeScreen ? 0.5 : 0 }} >

//                                 {isSemiMediumScreen &&
//                                     <IconButton
//                                         color="black"
//                                         aria-label="open drawer"
//                                         onClick={() => setIsOpenDrawer(!isOpenDrawer)}
//                                         edge="start"
//                                         sx={{ mr: 1 }}
//                                     >
//                                         <MenuIcon fontSize='inherit' />
//                                     </IconButton>}

//                                 <div className='flex w-full justify-between items-center'>
//                                     <Link to={'/home'}>
//                                         <img className='sm:max-h-14 max-h-11 my-auto cursor-pointer' src={logo_black} alt="Logo" />
//                                     </Link>

//                                     {!isSemiMediumScreen && <div className='sm:mr-5'>
//                                         <Links />
//                                     </div>}

//                                     <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
//                                         <TextField
//                                             label="Search products"
//                                             variant="outlined"
//                                             size="small"
//                                             value={searchTerm}
//                                             onChange={handleSearchChange}
//                                             style={{ marginRight: '8px' }}
//                                         />
//                                         <Button type="submit" variant="contained" color="primary">Search</Button>
//                                     </form>

//                                     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                                         <Tooltip title="Cart">
//                                             <Link to={'/cart'}>
//                                                 <IconButton aria-label="cart">
//                                                     <Badge badgeContent={cartItems.length} color="primary">
//                                                         <ShoppingCartRounded fontSize='inherit' />
//                                                     </Badge>
//                                                 </IconButton>
//                                             </Link>
//                                         </Tooltip>
//                                         {isUserLoggedIn ?
//                                             <Tooltip title="Account">
//                                                 <Link to={'/profile'}>
//                                                     <IconButton aria-label="account">
//                                                         <AccountCircle fontSize='inherit' />
//                                                     </IconButton>
//                                                 </Link>
//                                             </Tooltip> :
//                                             <Button
//                                                 variant='contained'
//                                                 onClick={() => navigate('/login')}
//                                                 sx={{
//                                                     bgcolor: '#62A82C', borderRadius: '16px', minWidth: '80px', minHeight: '33px',
//                                                     ":hover": {
//                                                         bgcolor: '#62A82C'
//                                                     }
//                                                 }}>
//                                                 Log in
//                                             </Button>}
//                                         {isUserLoggedIn && <Button
//                                             variant='contained'
//                                             onClick={handleLogOut}
//                                             sx={{
//                                                 bgcolor: '#62A82C', borderRadius: '16px', minWidth: '80px', minHeight: '33px', ml: 2,
//                                                 ":hover": {
//                                                     bgcolor: '#62A82C'
//                                                 }
//                                             }}>
//                                             Log out
//                                         </Button>}
//                                     </Box>
//                                 </div>
//                             </Container>
//                         </Toolbar>
//                     </AppBar>
//                 </ElevationScroll>
//             </nav>

//             <Toolbar id="back-to-top-anchor" />
//             <ScrollTop {...props}>
//                 <Fab color="primary" size="small" aria-label="scroll back to top">
//                     <KeyboardArrowUpIcon />
//                 </Fab>
//             </ScrollTop>

//             <Drawer anchor='left' open={isOpenDrawer} onClose={() => setIsOpenDrawer(!isOpenDrawer)}>
//                 <Links drawer={true} setIsOpenDrawer={setIsOpenDrawer} isOpenDrawer={isOpenDrawer} />
//             </Drawer>
//         </>
//     );
// }

// export default Navbar;
