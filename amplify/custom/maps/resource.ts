import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import * as locations from 'aws-cdk-lib/aws-location';
import { Construct } from 'constructs';

export class LocationMapStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create the map resource
    const map = new locations.CfnMap(this, 'LocationMap', {
      configuration: {
        style: 'VectorEsriStreets' // map style
      },
      description: 'My Location Map',
      mapName: 'MyMap'
    });

    new CfnOutput(this, 'mapArn', {
      value: map.attrArn,
      exportName: 'mapArn'
    });
  }
}