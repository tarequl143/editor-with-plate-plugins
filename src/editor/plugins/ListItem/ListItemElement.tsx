

const ListItemElement = (props: any) => {
    const { attributes, children } = props;
    return (
        <li {...attributes}>{children}</li>
    );
};

export default ListItemElement;
