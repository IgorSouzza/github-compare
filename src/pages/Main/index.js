import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';

import { Container, Form } from './styles';

import logo from '../../assets/logo.png';

import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: [],
    repositories: [],
  };

  componentDidMount() {
    const storage = localStorage.getItem('repositories');
    this.setState({ repositories: storage != null ? JSON.parse(storage) : [] });
  }

  handleAddRepository = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const { repositories, repositoryInput } = this.state;

    try {
      const { data: repository } = await api.get(`repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositoryInput: '',
        repositories: [...repositories, repository],
      });
      localStorage.setItem('repositories', JSON.stringify([...repositories, repository]));
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleRefreshRepository = async (id) => {
    const { repositories } = this.state;
    const repository = repositories.find(repo => repo.id === id);

    try {
      const { data } = await api.get(`/repos/${repository.full_name}`);
      data.lastCommit = moment(data.pushed_at).fromNow();

      this.setState({
        repositories: repositories.map(repo => (repo.id === data.id ? data : repo)),
      });
      localStorage.setItem('repositories', JSON.stringify(repositories));
    } catch (err) {
      this.setState({ repositoryError: true });
    }
  }

  handleDeleteRepository = (id) => {
    const { repositories } = this.state;
    const filteredRepositories = repositories.filter((value) => {
      const clickedId = value.id;
      return clickedId !== id;
    });

    this.setState({ repositories: filteredRepositories });
    localStorage.setItem('repositories', JSON.stringify(filteredRepositories));
  }

  render() {
    const {
      loading,
      repositoryInput,
      repositories,
      repositoryError,
    } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form error={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}
          </button>
        </Form>
        <CompareList
          repositories={repositories}
          refreshRepository={this.handleRefreshRepository}
          deleteRepository={this.handleDeleteRepository}
        />
      </Container>
    );
  }
}
