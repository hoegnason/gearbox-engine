import * as PropTypes from 'prop-types';
import * as React from 'react';

export interface ITileMapProps {
    columns?: number;
    layers?: any;
    renderTile?: (tile: any, src: any, styles: React.CSSProperties) => {};
    rows?: number;
    scale?: number; // TODO skal rættast!
    src?: string;
    style: React.CSSProperties;
    tileSize?: number;
}

const defaultTileSize = 64;

export default class TileMap extends React.Component<ITileMapProps, {}> {
    public static propTypes = {
        columns: PropTypes.number,
        layers: PropTypes.array,
        renderTile: PropTypes.func,
        rows: PropTypes.number,
        scale: PropTypes.number,
        src: PropTypes.string,
        style: PropTypes.object,
        tileSize: PropTypes.number,
    };

    public static defaultProps = {
        columns: 16,
        layers: [],
        renderTile: (tile: any, src: any, styles: React.CSSProperties) => <img style={styles} src={src} />,
        rows: 9,
        src: '',
        tileSize: defaultTileSize,
    };

    public static contextTypes = {
        scale: PropTypes.number,
    };

    // TODO: Fix types!
    public shouldComponentUpdate(nextProps: any, nextState: any, nextContext: any) {
        return this.context.scale !== nextContext.scale;
    }

    public render() {
        const layers = this.generateMap();

        return (
            <div style={{ ...this.getWrapperStyles(), ...this.props.style }}>
                {layers.map((layer: any, index: number) => {
                    return (
                        <div key={`layer-${index}`} style={this.getLayerStyles()}>
                            {layer}
                        </div>
                    );
                })}
            </div>
        );
    }

    private generateMap() {
        const { columns, layers, rows } = this.props;

        const mappedLayers: any = [];

        if (null != rows && null != columns && null != this.props.renderTile) {

            layers.forEach((l: any, index: any) => {
                const layer = [];
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < columns; c++) {
                        const gridIndex = r * columns + c;
                        if (l[gridIndex] !== 0) {
                            layer.push(
                                <div
                                    key={`tile-${index}-${r}-${c}`}
                                    style={this.getImageWrapperStyles(r, c)}
                                >
                                    {null != this.props.renderTile && this.props.renderTile(
                                        this.getTileData(r, c, l[gridIndex]),
                                        this.props.src,
                                        this.getImageStyles(l[gridIndex])
                                    )}
                                </div>
                            );
                        }
                    }
                }
                mappedLayers.push(layer);
            });
        }

        return mappedLayers;
    }

    private getTileData(row: number, column: number, index: number) {
        let tileSize = defaultTileSize;
        
        // const { tileSize } = this.props;

        if (null != this.props.tileSize) {
            tileSize = this.props.tileSize;
        }

        const size = tileSize;
        const left = column * size;
        const top = row * size;

        return {
            index,
            left,
            size: tileSize,
            top
        };
    }

    private getImageStyles(imageIndex: number): React.CSSProperties {
        const { scale } = this.context;
        let tileSize = defaultTileSize;

        if (null != this.props.tileSize) {
            tileSize = this.props.tileSize;
        }

        const size = Math.round(scale * tileSize);
        const left = (imageIndex - 1) * size;

        return {
            display: 'block',
            height: '100%',
            imageRendering: 'pixelated',
            position: 'absolute',
            transform: `translate(-${left}px, 0px)`
        };
    }

    private getImageWrapperStyles(row: number, column: number): React.CSSProperties {
        const { scale } = this.context;
        let tileSize = defaultTileSize;

        if (null != this.props.tileSize) {
            tileSize = this.props.tileSize;
        }

        const size = Math.round(scale * tileSize);
        const left = column * size;
        const top = row * size;

        return {
            height: size,
            overflow: 'hidden',
            position: 'absolute',
            transform: `translate(${left}px, ${top}px)`,
            width: size
        };
    }

    private getLayerStyles(): React.CSSProperties {
        return {
            left: 0,
            position: 'absolute',
            top: 0
        };
    }

    private getWrapperStyles(): React.CSSProperties {
        return {
            left: 0,
            position: 'absolute',
            top: 0
        };
    }
}