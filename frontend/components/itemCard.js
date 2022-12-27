export default function ItemCard(props) {
    return (
            <div>
                <div className="relative">
                    <img src={"https://image.tmdb.org/t/p/original" + props.data.backdrop_path}></img>
                    <h1 className="absolute text-5xl font-extrabold text-center text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                        {props.data.title ? props.data.title : props.data.name}
                    </h1>
                </div>
            </div>

    )
}