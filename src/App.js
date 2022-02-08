import './App.css';
import ColumnItem from './ColumnItem';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {

 

  const pageLimit = 5;

  const [pageNr, setPageNr] = useState(0);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchInput = (ev) => {
    setSearchTerm(ev.target.value);
    console.log(ev.target.value);
  }

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
        <header>
          <div className="header-item">Home</div>
          <div className="header-item">Latest news</div>
          <div className="header-item">Showbiz</div>
          <div className="header-item">Gossip</div>
          <div className="header-item header-item-search">
            <input onChange={(ev) => onSearchInput(ev)} type='text' placeholder='Search' value={searchTerm} />
          </div>
          <div className="header-item">Login</div>
        </header>
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
          {items.filter(x => {
            if(searchTerm==='') {
              return true;
            }
            else {
              return x.node.title.toLowerCase().search(searchTerm.toLowerCase()) !== -1;
            }
          }).map(x => <ColumnItem key={x.node.nid} node={x.node} />)}
        </InfiniteScroll>
        </div>
      </div>
    );
  
}

export default App;
