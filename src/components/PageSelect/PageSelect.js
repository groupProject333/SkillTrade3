import React from 'react';
//import PropTypes from 'prop-types';
import "../../App.css";
import { Pagination, PaginationItem, PaginationLink, Container } from 'reactstrap';




class PageSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedPage: 'All'
		};

		this.updatePage = this.updatePage.bind(this);
	}

	updatePage(page) {
		this.setState(function() {
			return {
				selectedPage: page
			};
		});
	}

	render() {
		var pages = [ 'Page 1', 'Page 2', 'Page 3', 'Page4' ];
		return (
			<Container id="containPages">
				<Pagination className="pages">
					<PaginationItem>
						<PaginationLink previous href="#" />
					</PaginationItem>
					{pages.map(function(page) {
						return (
								<PaginationItem>
									<PaginationLink
										key={page}
										style={page === this.state.selectedPage ? { color: '#d0021b' } : null}
										onClick={this.updatePage}
										>
										{page}
									</PaginationLink>
								</PaginationItem>
								);
								}, this)}
					<PaginationItem>
						<PaginationLink next href="#" />
					</PaginationItem>
				</Pagination>
			</Container>
		);
	}
}



export default PageSelect;
