<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;
use App\Models\Article;

class ScrapeBeyondChatsBlogs extends Command
{
    protected $signature = 'scrape:beyondchats';
    protected $description = 'Scrape BeyondChats blog articles';

    public function handle()
    {
        $client = new Client([
            'timeout' => 10,
        ]);

        $response = $client->get('https://beyondchats.com/blogs');
        $html = $response->getBody()->getContents();

        $crawler = new Crawler($html);

        $crawler->filter('article')->each(function (Crawler $node) {

            $title = $node->filter('h2')->count()
                ? $node->filter('h2')->text()
                : 'No title';

            $content = $node->filter('p')->count()
                ? $node->filter('p')->text()
                : 'No content';

            $url = $node->filter('a')->count()
                ? $node->filter('a')->attr('href')
                : null;

            if ($url) {
                Article::updateOrCreate(
                    ['url' => $url],
                    [
                        'title' => $title,
                        'content' => $content
                    ]
                );
            }
        });

        $this->info('Blogs scraped successfully!');
    }
}
