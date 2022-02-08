import './App.css';
import ColumnItem from './ColumnItem';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {

  const pageLimit = 20;

  const [pageNr, setPageNr] = useState(0);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    let url = "https://www.pinkvilla.com/photo-gallery-feed-page";
    if(pageNr > 0) {
      url = url + "/page/" + pageNr;
    }

    if(pageNr === pageLimit) {
      setHasMore(false);
    }
    
    let data = await fetch(url);
    let parsedData = await data.json();
    setItems([...items, ...parsedData.nodes]);
    setPageNr(pageNr + 1);
  }

  useEffect(() => {
    fetchData();
  }, []);
    return (
      <div className="App">
        <div className="center-column" >
        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}>
          {items.map(x => <ColumnItem key={x.node.nid} node={x.node} />)}
        </InfiniteScroll>
        </div>
      </div>
    );
  
}

export default App;
