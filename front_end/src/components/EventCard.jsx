import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="stock-container">
    {festival.map((data, key) => {
      return (
        <div key={key}>
              <Ticket
                key={key}
                name={data.name}
                ticketID={data.ticketID}
                stockPrice={data.stockPrice}
                admissionType={data.admissionType}
                numTickets={data.numTickets}
              />
            </div>
          );
      })}
    </div>
  );
};

const Ticket = ({name, ticketID, stockPrice, admissionType, numTickets}) => {
  if(!name) return <div />;
  return (
    <table>
    <tbody>
      <tr>
        <td>
          <h5>{name}</h5>
        </td>
        <td>
          <h5>{ticketID}</h5>
        </td>
        <td>
          <h4>{stockPrice}</h4>
        </td>
        <td>
          <p>{admissionType}</p>
        </td>
        <td>
          <h5>{numTickets}</h5>
        </td>
      </tr>
    </tbody>
  </table>
  );
};
