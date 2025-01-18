export class MovieDto {
  constructor(
    public id: string,
    public characters: string[],
    public created: string,
    public director: string,
    public edited: string,
    public episodeId: number,
    public openingCrawl: string,
    public planets: string[],
    public producer: string,
    public releaseDate: string,
    public species: string[],
    public starships: string[],
    public title: string,
    public url: string,
    public vehicles: string[],
  ) {}
}
