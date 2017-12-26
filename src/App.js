import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';

Example = React.createClass({
    displayName: 'Example',

    getInitialState: function getInitialState() {
        return {
            currentDragItem: null
        };
    },
    render: function render() {
        return div({
            className:
                'dnd-example ' +
                (this.state.currentDragItem ? 'dragging' : void 0),
            children: [
                SourceObjects({
                    onDragStart: this.onDragStart,
                    onDragStop: this.onDragStop
                }),
                DropTargets({
                    currentDragItem: this.state.currentDragItem,
                    onDrop: this.onDrop
                }),
                this.dropDescription()
            ]
        });
    },
    onDragStart: function onDragStart(details) {
        return this.setState({
            currentDragItem: details
        });
    },
    onDragStop: function onDragStop() {
        return this.setState({
            currentDragItem: null
        });
    },
    onDrop: function onDrop(target) {
        return this.setState({
            lastDrop: {
                source: this.state.currentDragItem,
                target: target
            }
        });
    },
    dropDescription: function dropDescription() {
        var drop;
        if ((drop = this.state.lastDrop)) {
            return p({
                className: 'drop-description',
                children:
                    'Dropped source ' +
                    drop.source.type +
                    '-' +
                    drop.source.index +
                    ' on target ' +
                    drop.target.index
            });
        }
    }
});

SourceObjects = React.createClass({
    displayName: 'SourceObjects',

    render: function render() {
        var i, object;
        return div({
            className: 'dnd-source-objects',
            children: function() {
                var j, len, ref, results;
                ref = this.objects();
                results = [];
                for (i = j = 0, len = ref.length; j < len; i = ++j) {
                    if (window.CP.shouldStopExecution(1)) {
                        break;
                    }
                    if (window.CP.shouldStopExecution(1)) {
                        break;
                    }
                    object = ref[i];
                    results.push(
                        SourceObject({
                            type: object.type,
                            index: i + 1,
                            children: i + 1,
                            onDragStart: this.props.onDragStart,
                            onDragStop: this.props.onDragStop
                        })
                    );
                }
                window.CP.exitedLoop(1);

                window.CP.exitedLoop(1);

                return results;
            }.call(this)
        });
    },
    objects: function objects() {
        var i;
        return _.flatten([
            (function() {
                var j, results;
                results = [];
                for (i = j = 0; j <= 2; i = ++j) {
                    if (window.CP.shouldStopExecution(2)) {
                        break;
                    }
                    if (window.CP.shouldStopExecution(2)) {
                        break;
                    }
                    results.push({
                        type: 'green'
                    });
                }
                window.CP.exitedLoop(2);

                window.CP.exitedLoop(2);

                return results;
            })(),
            (function() {
                var j, results;
                results = [];
                for (i = j = 0; j <= 2; i = ++j) {
                    if (window.CP.shouldStopExecution(3)) {
                        break;
                    }
                    if (window.CP.shouldStopExecution(3)) {
                        break;
                    }
                    results.push({
                        type: 'blue'
                    });
                }
                window.CP.exitedLoop(3);

                window.CP.exitedLoop(3);

                return results;
            })()
        ]);
    }
});

SourceObject = React.createClass({
    displayName: 'SourceObject',

    render: function render() {
        return Draggable({
            className: 'dnd-source-object ' + this.props.type,
            children: this.props.children,
            onDragStart: this.props.onDragStart,
            onDragStop: this.props.onDragStop,
            dragData: this.dragData
        });
    },
    dragData: function dragData() {
        return {
            type: this.props.type,
            index: this.props.index
        };
    }
});

Draggable = React.createClass({
    displayName: 'Draggable',

    getInitialState: function getInitialState() {
        return {
            mouseDown: false,
            dragging: false
        };
    },
    render: function render() {
        return this.transferPropsTo(
            div({
                style: this.style(),
                className:
                    'dnd-draggable ' +
                    (this.state.dragging ? 'dragging' : void 0),
                children: this.props.children,
                onMouseDown: this.onMouseDown
            })
        );
    },
    style: function style() {
        if (this.state.dragging) {
            return {
                position: 'absolute',
                left: this.state.left,
                top: this.state.top
            };
        } else {
            return {};
        }
    },
    onMouseDown: function onMouseDown(event) {
        var pageOffset;
        if (event.button === LEFT_BUTTON) {
            event.stopPropagation();
            this.addEvents();
            pageOffset = this.getDOMNode().getBoundingClientRect();
            return this.setState({
                mouseDown: true,
                originX: event.pageX,
                originY: event.pageY,
                elementX: pageOffset.left,
                elementY: pageOffset.top
            });
        }
    },
    onMouseMove: function onMouseMove(event) {
        var base, base1, deltaX, deltaY, distance;
        deltaX = event.pageX - this.state.originX;
        deltaY = event.pageY - this.state.originY;
        distance = Math.abs(deltaX) + Math.abs(deltaY);
        if (!this.state.dragging && distance > DRAG_THRESHOLD) {
            this.setState({
                dragging: true
            });
            if (typeof (base = this.props).onDragStart === 'function') {
                base.onDragStart(
                    typeof (base1 = this.props).dragData === 'function'
                        ? base1.dragData()
                        : void 0
                );
            }
        }
        if (this.state.dragging) {
            return this.setState({
                left: this.state.elementX + deltaX + document.body.scrollLeft,
                top: this.state.elementY + deltaY + document.body.scrollTop
            });
        }
    },
    onMouseUp: function onMouseUp() {
        this.removeEvents();
        if (this.state.dragging) {
            this.props.onDragStop();
            return this.setState({
                dragging: false
            });
        }
    },
    addEvents: function addEvents() {
        document.addEventListener('mousemove', this.onMouseMove);
        return document.addEventListener('mouseup', this.onMouseUp);
    },
    removeEvents: function removeEvents() {
        document.removeEventListener('mousemove', this.onMouseMove);
        return document.removeEventListener('mouseup', this.onMouseUp);
    }
});

DropTargets = React.createClass({
    displayName: 'DropTargets',

    render: function render() {
        var i, target;
        return div({
            className: 'dnd-drop-targets',
            children: function() {
                var j, len, ref, results;
                ref = this.targets();
                results = [];
                for (i = j = 0, len = ref.length; j < len; i = ++j) {
                    if (window.CP.shouldStopExecution(4)) {
                        break;
                    }
                    if (window.CP.shouldStopExecution(4)) {
                        break;
                    }
                    target = ref[i];
                    results.push(
                        DropTarget({
                            target: target,
                            index: i,
                            currentDragItem: this.props.currentDragItem,
                            onDrop: this.props.onDrop
                        })
                    );
                }
                window.CP.exitedLoop(4);

                window.CP.exitedLoop(4);

                return results;
            }.call(this)
        });
    },
    targets: function targets() {
        return [
            {
                accepts: ['blue']
            },
            {
                accepts: ['green']
            },
            {
                accepts: ['blue', 'green']
            },
            {
                accepts: []
            }
        ];
    }
});

DropTarget = React.createClass({
    displayName: 'DropTarget',

    getInitialState: function getInitialState() {
        return {
            hover: false
        };
    },
    render: function render() {
        var _this = this;

        return div({
            className: this.classes(),
            children: 'accepts ' + this.acceptsDescription(),
            onMouseEnter: function onMouseEnter() {
                return _this.setState({
                    hover: true
                });
            },
            onMouseLeave: function onMouseLeave() {
                return _this.setState({
                    hover: false
                });
            },
            onMouseUp: this.onDrop
        });
    },
    classes: function classes() {
        return [
            'dnd-drop-target',
            '' + this.props.target.accepts.join(' '),
            this.active() ? 'active' : void 0,
            this.active() && this.props.currentDragItem.type === 'green'
                ? 'active-green'
                : void 0,
            this.active() && this.props.currentDragItem.type === 'blue'
                ? 'active-blue'
                : void 0,
            this.disabled() ? 'disabled' : void 0,
            this.state.hover ? 'hover' : void 0
        ].join(' ');
    },
    active: function active() {
        var item, ref;
        item = this.props.currentDragItem;
        return (
            item &&
            ((ref = item.type),
            indexOf.call(this.props.target.accepts, ref) >= 0)
        );
    },
    disabled: function disabled() {
        var item, ref;
        item = this.props.currentDragItem;
        return (
            item &&
            ((ref = item.type),
            indexOf.call(this.props.target.accepts, ref) < 0)
        );
    },
    acceptsDescription: function acceptsDescription() {
        if (this.props.target.accepts.length > 0) {
            return this.props.target.accepts.join(' & ');
        } else {
            return 'nothing';
        }
    },
    onDrop: function onDrop() {
        var base;
        if (this.active()) {
            return typeof (base = this.props).onDrop === 'function'
                ? base.onDrop({
                      index: this.props.index + 1
                  })
                : void 0;
        }
    }
});

class App extends Component {
    componentWillMount() {
        'use strict';

        (function() {
            var DRAG_THRESHOLD,
                Draggable,
                DropTarget,
                DropTargets,
                Example,
                LEFT_BUTTON,
                SourceObject,
                SourceObjects,
                div,
                p,
                indexOf = [].indexOf;

            var _React$DOM = React.DOM;
            div = _React$DOM.div;
            p = _React$DOM.p;

            LEFT_BUTTON = 0;

            DRAG_THRESHOLD = 3; // pixels

            document.addEventListener('DOMContentLoaded', function() {
                return React.renderComponent(Example(), document.body);
            });
        }.call(undefined));
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                </p>
            </div>
        );
    }
}

export default App;
