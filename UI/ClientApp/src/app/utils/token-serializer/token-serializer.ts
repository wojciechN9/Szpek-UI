import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';

export class TokenUrlSerializer implements UrlSerializer {
    private _defaultUrlSerializer: DefaultUrlSerializer = new DefaultUrlSerializer();

    parse(url: string): UrlTree {
        // Encode "+" to "%2B"
        url = url.replace(/\+/gi, '%2B');
        // Use the default serializer.
        return this._defaultUrlSerializer.parse(url);
    }

    serialize(tree: UrlTree): string {
        return this._defaultUrlSerializer.serialize(tree).replace(/\+/gi, '%2B');
    }
}
