import "../css/Footer.css";

import GitHubIcon from "@mui/icons-material/GitHub";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { ReactComponent as OdinIcon } from "../data/odin-icon.svg";

const Footer: React.FC = () => {
  return (
    <footer>
      <List>
        <a href="https://www.theodinproject.com/">
          <ListItem>
            <ListItemIcon>
              <OdinIcon />
            </ListItemIcon>
            <ListItemText primary="The Odin Project" />
          </ListItem>
        </a>
        <a href="https://www.github.com/lippiece">
          <ListItem>
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary="My GitHub" />
          </ListItem>
        </a>
      </List>
    </footer>
  );
};

export default Footer;
