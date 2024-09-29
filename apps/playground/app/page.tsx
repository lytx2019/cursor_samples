import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const examples = [
  { name: "Conway's Game of Life", path: "/examples/game-of-life" },
  // 可以在此处添加更多示例
];

export default function Examples() {
  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        Examples
      </Typography>
      <List>
        {examples.map((example) => (
          <ListItem key={example.path} button component="a" href={example.path}>
            <ListItemText primary={example.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}