import './App.css';
import ColumnItem from './ColumnItem';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {

  const pageLimit = 5;

  const [pageNr, setPageNr] = useState(0);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async () => {
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
  }, [items, pageNr]);

  useEffect(() => {
    fetchData();
  }, []);
    return (
      <div className="App">
        <div className="center-column" >
        <InfiniteScroll
          dataLength={items.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p className="end-message">
              <b>Yay! You have seen it all!</b>
            </p>
          }
          >
          {items.map(x => <ColumnItem key={x.node.nid} node={x.node} />)}
        </InfiniteScroll>
        </div>
      </div>
    );
  
}

export default App;
