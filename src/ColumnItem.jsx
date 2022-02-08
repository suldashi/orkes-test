const baseUrl = 'https://www.pinkvilla.com';

function ColumnItem(props) {
  return <div className='column-item'>
      <img alt={props.node.title} width={200} height={200} src={baseUrl+props.node.field_photo_image_section} />
      <div>
          <h1>{props.node.title}</h1>
          <h3>Insert subtitle here</h3>
      </div>
  </div>
}

export default ColumnItem;
